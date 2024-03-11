/*#include <bits/stdc++.h>
using namespace std;

int breakInteger(int n)
{
    if(n == 1){
        return n;
    }
    if(n == 2 || n == 2){
        return n-1;
    }
    long long int res = 1;
    while(n > 4){
        n -= 3;
        res *= 3;
    }
    return (n*res);
}

int main(){
    int n;
    cin>>n;
    int maxProduct = breakInteger(n);
    cout<<maxProduct<<endl;
}*/

#include <bits/stdc++.h>
using namespace std;

int breakInteger(int n)
{
    int dp[n + 1];
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++)
    {
        dp[i] = INT_MIN;
    }
    for (int i = 2; i <= n; i++)
    {
        for (int k = 1; k < i; k++)
        {
            dp[i] = max(dp[i], max(dp[i - k], i - k) * k);
        }
    }
    return dp[n];
}

int main()
{
    int n;
    cin >> n;
    int maxProduct = breakInteger(n);
    cout << maxProduct << endl;
}