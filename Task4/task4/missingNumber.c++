#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++)
    {
        cin >> v[i];
    }
    vector<int> vis(n + 1, 0);
    for (int i = 0; i < n; i++)
    {
        vis[v[i]] = 1;
    }
    for (int it = 1; it < vis.size(); it++)
    {
        if (vis[it] == 0)
        {
            cout << it << endl;
        }
    }
}