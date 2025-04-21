/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let curr1 = list1;
    let curr2 = list2;

    let merged = new ListNode();
    let tail = merged;

    while (curr1 && curr2) {
        if (curr1.val < curr2?.val) {
            tail.next = curr1;
            curr1 = curr1.next;
        } else {
            tail.next = curr2;
            curr2 = curr2.next;
        }

        tail = tail.next;
    }

    if (curr1) {
        tail.next = curr1;
    }

    if (curr2) {
        tail.next = curr2;
    }

    return merged.next;
};