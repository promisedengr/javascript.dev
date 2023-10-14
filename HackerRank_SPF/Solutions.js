//1.
function balancedSum(arr) {
    let left = [];
    let tot;
    let i;
    left.push(arr[0]);
    tot = arr[0];
    for(i = 1; i < arr.length; i ++) {
        left.push(left[i - 1] + arr[i]);
        tot += arr[i];
    }
    for(i = 1; i < arr.length; i ++) {
        if(left[i - 1] === tot - left[i]) {
            return i;
        }
    }
    return -1;
}

//3.
function manipulateStudentRecord(obj, operation, prop, newValue) {
    if(operation === 'edit') {
        if(obj[prop] !== undefined) {
            obj[prop] = newValue;
        }
        return obj;
    }
    if(operation === 'delete') {
        delete obj[prop];
        return obj;
    }
    return obj;
}

//4.
async function getUsernames(threshold) {
    var https = require('https');
    async function fetch_by_page(pagenum) {
        return new Promise((resolve, reject) => {
            https.get(`https://jsonmock.hackerrank.com/api/article_users?page=${pagenum}`, (res) => {
                res.setEncoding('utf8');
                res.on('data', function(body) {
                    resolve(JSON.parse(body));
                });
            });
        });
    }
    var res = { };
    var cur_page = 1;
    var result = [];
    do {
        res = await fetch_by_page(cur_page);
        if (Array.isArray(res.data)) {
            res.data.forEach(elem => {
                if (elem.submission_count > threshold) {
                    result.push(elem.username);
                }
            });
        }
        ++ cur_page;
    } while (cur_page <= res.total_pages);
    return result;
}

//8.
function connectedSum(n, edges) {
    let visit = new Array(n).fill(false)
    let graph = new Array(n)
    for (let i = 0; i < n; i++){
      graph[i] = []
    }
    let result = 0
    edges.forEach(edge => {
      const nodes = edge.split(' ')
      graph[parseInt(nodes[0]) - 1].push(parseInt(nodes[1]) - 1)
      graph[parseInt(nodes[1]) - 1].push(parseInt(nodes[0]) - 1)
    })
    for (let i = 0; i < n; i++) {
      if (!visit[i]) {
        let queue = [i]
        let cnt = 1
        visit[i] = true
        queue.push(i)
        while (queue.length > 0) {
          const cur = queue.shift()
          graph[cur].forEach(node => {
            if (!visit[node]) {
              cnt++;
              visit[node] = true
              queue.push(node)
            }
          })
        }
        result += Math.ceil(Math.sqrt(cnt))
      }
    }
    return result
}