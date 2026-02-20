#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> grid;
    int r,c;
    vector<pair<int,int>> dirs{{-1,0},{1,0},{0,-1},{0,1}};
    using pii = pair<int,int>;

    Solution(const vector<vector<int>>& mat) : grid(mat) {
        r = grid.size();
        c = r ? grid[0].size() : 0;
    }

    int shortestPath(pii src, pii dst) {
        if (!inBounds(src) || !inBounds(dst) || grid[src.first][src.second]==1 || grid[dst.first][dst.second]==1)
            return -1;
        const int INF=1e9;
        vector<vector<int>> dist(r, vector<int>(c, INF));
        struct Node{int d; pii p;};
        struct Cmp{bool operator()(const Node&a,const Node&b)const{return a.d>b.d;}};
        priority_queue<Node, vector<Node>, Cmp> pq;
        dist[src.first][src.second]=0;
        pq.push({0,src});
        while(!pq.empty()){
            auto node = pq.top(); pq.pop();
            int d = node.d;
            pii p = node.p;
            if(d>dist[p.first][p.second]) continue;
            if(p==dst) return d+1;
            for(auto &dir:dirs){
                int nr=p.first+dir.first;
                int nc=p.second+dir.second;
                if(inBounds({nr,nc}) && grid[nr][nc]==0){
                    if(dist[nr][nc] > d+1){
                        dist[nr][nc] = d+1;
                        pq.push({dist[nr][nc],{nr,nc}});
                    }
                }
            }
        }
        return -1;
    }
private:
    bool inBounds(const pii &p){return p.first>=0 && p.first<r && p.second>=0 && p.second<c;}
};

int main(){
    vector<vector<int>> grid = {
        {0,0,1,0,0},
        {0,0,0,1,0},
        {1,0,0,0,0},
        {0,1,0,0,1},
        {0,0,0,0,0}
    };
    Solution sol(grid);
    pair<int,int> src{0,0};
    pair<int,int> dst{4,4};
    int dist = sol.shortestPath(src,dst);
    if(dist!=-1)
        cout<<"Dijkstra shortest path length = "<<dist<<"\n";
    else
        cout<<"Dijkstra no path exists\n";
    return 0;
}
