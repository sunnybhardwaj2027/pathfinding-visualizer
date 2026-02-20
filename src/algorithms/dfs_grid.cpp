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

    int findPath(pii src, pii dst) {
        if (!inBounds(src) || !inBounds(dst) || grid[src.first][src.second]==1 || grid[dst.first][dst.second]==1)
            return -1;
        vector<vector<bool>> seen(r, vector<bool>(c,false));
        int len = 0;
        bool found = dfs(src.first, src.second, dst, seen, len);
        return found ? len : -1;
    }

private:
    bool dfs(int x, int y, const pii &dst, vector<vector<bool>>& seen, int &len) {
        if(x<0||x>=r||y<0||y>=c||grid[x][y]==1||seen[x][y]) return false;
        seen[x][y] = true;
        len++;
        if(pii{x,y}==dst) return true;
        for(auto &dir:dirs){
            if(dfs(x+dir.first,y+dir.second,dst,seen,len)) return true;
        }
        len--;
        return false;
    }
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
    int len = sol.findPath(src,dst);
    if(len!=-1)
        cout<<"DFS path length = "<<len<<"\n";
    else
        cout<<"DFS no path exists\n";
    return 0;
}
