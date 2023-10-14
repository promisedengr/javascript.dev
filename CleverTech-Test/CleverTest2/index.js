const openConnections = async (connect, desiredCount) => {
  const connections = [];

  for (let index = 0; index < desiredCount; index++) {
    try {
      const connection = await connect();
      connections.push(connection);
    } catch (err) {
      return connections;
    }
  }

  return connections;
}

const downloadEnqueuedList = async (download, list, save) => {
  try {
    for (let index = 0; index < list.length; index++) {
      const result = await download(list[index]);
      await save(result);
    }
  } catch (err) {
    throw err;
  }
}

const pooledDownload = async (connect, save, downloadList, maxConcurrency) => {
  const desiredPoolSize = Math.min(downloadList.length, maxConcurrency);
  const connections = await openConnections(connect, desiredPoolSize);

  if (connections.length === 0) {
    throw new Error('connection failed');
  }

  const poolSize = connections.length;
  const connectionPool = connections.map((connection) => ({
    connection,
    enqueuedList: [],
  }));

  for (let index = 0; index < downloadList.length; index++) {
    connectionPool[index % poolSize]['enqueuedList'].push(downloadList[index]);
  }

  try {
    const downloadTasks = connectionPool.map(({ connection: { download }, enqueuedList }) => downloadEnqueuedList(download, enqueuedList, save));
    await Promise.all(downloadTasks);
  } catch (err) {
    throw err;
  } finally {
    connectionPool.forEach(({ connection: { close } }) => close())
  }

  return 'download completed!';
}

module.exports = pooledDownload
