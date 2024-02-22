#include <bits/stdc++.h>
#include <fstream>
using namespace std;

int main()
{
    // ofstream myFile("inputFile.txt");
    // myFile << "Hello this is input file";
    // myFile.close();

    ifstream inpFile("inputFile.txt");
    ofstream outFile("outputFile.txt");

    string words;

    while (getline(inpFile, words))
    {
        outFile << words;
    }

    inpFile.close();
    outFile.close();
}
