#include <bits/stdc++.h>
using namespace std;

class Node
{
public:
    int data;
    Node *next;

    Node(int val) : data(val), next(nullptr) {}
};

// Function to convert an array to a linked list
Node *arrayToLinkedList(vector<int> &arr)
{
    if (arr.empty())
    {
        return nullptr;
    }

    Node *head = new Node(arr[0]);
    Node *current = head;

    for (int i = 1; i < arr.size(); ++i)
    {
        current->next = new Node(arr[i]);
        current = current->next;
    }

    return head;
}

// Function to move zeros to the end of the linked list
Node *moveZerosToEnd(Node *head)
{
    ;
    if (!head || !head->next)
    {
        return head;
    }
    Node *temp = new Node(0);
    Node *x = temp;
    Node *curr = head;
    Node *lenp = head;
    int len = 0;
    while (lenp != NULL)
    {
        len++;
        lenp = lenp->next;
    }
    while (curr != NULL)
    {
        if (curr->data != 0)
        {
            temp->next = curr;
            temp = temp->next;
            len--;
        }
        curr = curr->next;
    }
    while (len != 0)
    {
        Node *node = new Node(0);
        temp->next = node;
        temp = temp->next;
        len--;
    }

    return x->next;
}

// Function to print the linked list
void printLinkedList(Node *head)
{
    Node *current = head;
    while (current)
    {
        cout << current->data << " ";
        current = current->next;
    }
    cout << endl;
}

int main()
{
    // Taking array input from the user
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++)
    {
        cin >> v[i];
    }
    Node *head = arrayToLinkedList(v);
    printLinkedList(head);
    Node *temp = moveZerosToEnd(head);
    printLinkedList(temp);
}
