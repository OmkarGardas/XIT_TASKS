#include <bits/stdc++.h>
using namespace std;

vector<int> mergeSortList(vector<int> &v1, vector<int> &v2)
{
    vector<int> res;
    for (auto it : v1)
    {
        res.push_back(it);
    }
    for (auto it : v2)
    {
        res.push_back(it);
    }
    sort(res.begin(), res.end());
    return res;
}
int main()
{
    int n1, n2;
    cin >> n1 >> n2;
    vector<int> v1, v2;
    for (int i = 0; i < n1; i++)
    {
        int ele;
        cin >> ele;
        v1.push_back(ele);
    }
    for (int i = 0; i < n2; i++)
    {
        int ele;
        cin >> ele;
        v2.push_back(ele);
    }

    vector<int> res = mergeSortList(v1, v2);
    for (auto it : res)
    {
        cout << it << " ";
    }
}