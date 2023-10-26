// you can use includes, for example:
// #include <algorithm>

// you can write to stdout for debugging purposes, e.g.
// cout << "this is a debug message" << endl;

#include < unordered_map >

int maxPathUtil(tree * node, unordered_map < int, int > m)
{
  if (!node)
    return m.size();

  // put this node into hash
  m[node -> x]++;

  int max_path = max(maxPathUtil(node -> l, m),
    maxPathUtil(node -> r, m));

  // remove current node from path "hash"
  m[node -> x]--;

  // if we reached a condition where all duplicate value
  // of current node is deleted
  if (m[node -> x] == 0)
    m.erase(node -> x);

  return max_path;
}

int maxUinquePath(tree * node)
{
  if (!node)
    return 0;

  // hash that store all node value
  unordered_map < int, int > hash;

  // return max length unique value path
  return maxPathUtil(node, hash);
}

int solution(tree * T) {
  return maxUinquePath(T);
}

