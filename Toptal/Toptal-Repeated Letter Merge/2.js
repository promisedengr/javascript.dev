function Solution(S, K) {
    const N = S.length;
    if(N == K) {
		return 0;
	}
    let compressed = [];
    let rev_compressed = [];
    let prev = [];
    let next = [];
    let i, j;
    let ch = undefined, rev_ch = undefined;
    let cnt = 0, rev_cnt = 0;
    let len = undefined, rev_len = undefined;
    let answer, optimizedLen;
    for(i = 0, j = N - 1; i < N && j >= 0; i ++, j --) {
        if(ch == undefined || ch != S[i]) {
            len = len == undefined ? 0 : compressed[i - 1];
            ch = S[i];
            cnt = 1;
        }
        else {
            cnt ++;
        }
        prev[i] = cnt;
        compressed[i] = len + 1 + (cnt == 1 ? 0 : cnt.toString().length);
        if(rev_ch == undefined || rev_ch != S[j]) {
            rev_len = rev_len == undefined ? 0 : rev_compressed[j + 1];
            rev_ch = S[j];
            rev_cnt = 1;
        }
        else {
            rev_cnt ++;
        }
        next[j] = rev_cnt;
        rev_compressed[j] = rev_len + 1 + (rev_cnt == 1 ? 0 : rev_cnt.toString().length);
    }
    answer = rev_compressed[K] < compressed[N - K - 1] ? rev_compressed[K] : compressed[N - K - 1];
    for(i = 1; i < N - K; i ++) {
        j = i + K - 1;
        optimizedLen = 0;
        if(i - prev[i - 1] - 1 >= 0) {
			optimizedLen += compressed[i - prev[i - 1] - 1];
		}
        if(j + next[j + 1] + 1 < N) {
			optimizedLen += rev_compressed[j + next[j + 1] + 1];
		}
        if(S[i - 1] === S[j + 1]) {
            optimizedLen += 1 + ((prev[i - 1] + next[j + 1]) == 1 ? 0 : (prev[i - 1] + next[j + 1]).toString().length);
        }
        else {
            optimizedLen += 1 + (prev[i - 1] == 1 ? 0 : prev[i - 1].toString().length);
            optimizedLen += 1 + (next[j + 1] == 1 ? 0 : next[j + 1].toString().length);
        }
        if(answer > optimizedLen) {
			answer = optimizedLen;
		}
    }
    return answer;
}