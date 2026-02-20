#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> grid;
    int r, c;
    vector<pair<int,int>> dirs{{-1,0},{1,0},{0,-1},{0,1}};

    Solution(const vector<vector<int>>& mat) : grid(mat) {
        r = grid.size();
        c = r ? grid[0].size() : 0;
    }

    int shortestPath(pair<int,int> src, pair<int,int> dst) {
        if (!inBounds(src) || !inBounds(dst) || grid[src.first][src.second]==1 || grid[dst.first][dst.second]==1)
            return -1;
        vector<vector<bool>> seen(r, vector<bool>(c,false));
        queue<pair<pair<int,int>,int>> q;
        q.push({src,1});
        seen[src.first][src.second] = true;
        while(!q.empty()){
            auto [p,d] = q.front(); q.pop();
            if(p==dst) return d;
            for(auto &dir: dirs){
                int nr = p.first + dir.first;
                int nc = p.second + dir.second;
                pair<int,int> np{nr,nc};
                if(inBounds(np) && !seen[nr][nc] && grid[nr][nc]==0){
                    seen[nr][nc] = true;
                    q.push({np,d+1});
                }
            }
        }
        return -1;
    }

private:
    bool inBounds(const pair<int,int>& p) {
        return p.first>=0 && p.first<r && p.second>=0 && p.second<c;
    }
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
        cout<<"BFS shortest path length = "<<dist<<"\n";
    else
        cout<<"BFS no path exists\n";
    return 0;
}
