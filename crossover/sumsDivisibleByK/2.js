function sumsDivisibleByK (a, k) {
    let i, j
    let N = a.length
    let ans = 0
    let m = new Map()
    for(i = N - 1; i >= 0; i --) {
        let t = a[i] % k
        let p = t === 0 ? 0 : k - t
        if(m.has(p)) {
            ans += m.get(p)
        }
        
        if(m.has(t)) {
            m.set(t, m.get(t) + 1)
        }
        else {
            m.set(t, 1)
        }
    }

    return ans
}