#include <bits/stdc++.h>
using namespace std;
int buyAndSell(vector<int> &stocks, int n)
{
    vector<int> maxArr(n), minArr(n);
    minArr[0] = stocks[0];
    for (int i = 1; i < n; i++)
    {
        minArr[i] = min(stocks[i], minArr[i - 1]);
    }
    maxArr[n - 1] = stocks[n - 1];
    for (int i = n - 2; i >= 0; i--)
    {
        maxArr[i] = max(stocks[i], maxArr[i + 1]);
    }
    int maxProfit = INT_MIN;
    for (int i = 0; i < n; i++)
    {
        maxProfit = max(maxProfit, abs(minArr[i] - maxArr[i]));
    }
    return maxProfit;
}
int main()
{
    int n;
    cin >> n;
    vector<int> stocks(n);
    for (int i = 0; i < n; i++)
    {
        cin >> stocks[i];
    }

    int maxProfit = buyAndSell(stocks, n);

    cout << maxProfit << endl;
}

/*
OUTPUT:

6
7 1 5 3 6 4
5

5
7 6 4 3 1
0

*/