const child_process = require('child_process')

const abortAll = async(serverName, reason = 'Unknown reason') => {
    console.log( serverName, 'CRASHED BY REASON:' )
    console.log( reason )
    for(const node of Object.values(nodes)) {
        await node.abort()
        .catch(e => { return e })
    }    
    process.exit(-1)
}

const nodes = {
    apiServer: child_process.fork('./nodes/api.js'),
    authServer: child_process.fork('./nodes/auth.js'),
    socketCluster: child_process.fork('./nodes/sockets.js'),
    worker: child_process.fork('./nodes/worker.js')
}

for(const nodeName of Object.keys(nodes)) {
    nodes[ nodeName ]
    .on('error', async(e) => {
        abortAll(nodeName, e)
    })

    nodes[ nodeName ]
    .on('exit', async(code, signal) => {
        console.log( nodeName,  code, signal)
    })

    nodes[ nodeName ]
    .on('message', (data = {}) => {
        for(const node of Object.values(nodes)) node.send(data)
    })
}