#include <bits/stdc++.h>
using namespace std;
vector<int> removeDup(vector<int> &arr, int n)
{
    vector<int> res;
    set<int> s;
    for (int i = 0; i < n; i++)
    {
        if (s.find(arr[i]) == s.end())
        {
            res.push_back(arr[i]);
            s.insert(arr[i]);
        }
    }
    return res;
}
int main()
{
    int n;
    cout << "Enter the size of the array: ";
    cin >> n;
    vector<int> arr(n);
    cout << "Enter array elements: \n";
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }
    vector<int> res = removeDup(arr, n);
    cout << "After removing duplicates\n";
    for (auto it : res)
    {
        cout << it << " ";
    }
    return 0;
}