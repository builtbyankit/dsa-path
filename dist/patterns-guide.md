# DSA Pattern Atlas

Original explanations and practice mapping. Templates may be schematic; read the stated assumptions.

## Frequency counting & complement lookup

### Recognize it
Unsorted membership, duplicates, anagrams, or pair conditions. Ask what summary of the processed prefix answers the next query.

### Invariant
The map represents only the already processed values. Query a complement before adding the current item when two distinct positions are required.

### Example
For [4,1,6], target 7: store 4, then 1. At 6, complement 1 is already present, so positions 1 and 2 form the answer.

### Template
```python
seen = {}
for i, x in enumerate(a):
    if target - x in seen:
        return (seen[target - x], i)
    seen[x] = i
return None
```

### Complexity
Expected O(n) time and O(n) memory for constant-size keys; hashing and equality costs matter for long strings.

### Common mistake
A set loses multiplicity. Checking after insertion can reuse the same index. Hash maps are not ordered-statistics structures.

### Follow-up
Count every valid pair instead of returning one: store frequencies and add count[target−x] before incrementing count[x].

### Practice ladder
Two Sum (1) → Valid Anagram (242) → Group Anagrams (49) → Longest Consecutive Sequence (128)

## Prefix sums & prefix-state hashing

### Recognize it
Many static range sums, or counting contiguous segments with an exact aggregate. Negative numbers are allowed.

### Invariant
P[j]−P[i] is the sum of [i,j). A frequency map counts earlier prefix values, including the initial zero prefix.

### Example
For [1,−1,1], target 1, prefixes [0,1,0,1] create three valid intervals. Repeated prefix zero contributes two starts at the last endpoint.

### Template
```python
freq = {0: 1}
s = answer = 0
for x in a:
    s += x
    answer += freq.get(s - target, 0)
    freq[s] = freq.get(s, 0) + 1
return answer
```

### Complexity
Expected O(n) time, O(n) memory for counting. Static prefix preprocessing is O(n), then O(1) per sum query.

### Common mistake
For longest length retain earliest index; for shortest retain latest; for counts retain all multiplicities. These map meanings are not interchangeable.

### Follow-up
Replace equality with a sum range: ordered prefix counts, a Fenwick tree, or merge-sort counting may be needed.

### Practice ladder
Range Sum Query - Immutable (303) → Subarray Sum Equals K (560) → Continuous Subarray Sum (523) → Range Sum Query 2D - Immutable (304) → Count of Range Sum (327)

## Opposing two pointers

### Recognize it
Sorted pair search, palindrome comparison, or a provably discardable endpoint. Sorting must preserve the information needed by the answer.

### Invariant
For a sorted target pair, if a[left]+a[right] is too small, no pair using left and an earlier right can work; discard left. The symmetric argument discards right.

### Example
Sorted [1,3,4,8], target 7: 1+8 too large, then 1+4 too small, then 3+4 matches.

### Template
```python
left, right = 0, len(a) - 1
while left < right:
    s = a[left] + a[right]
    if s == target: return (left, right)
    if s < target: left += 1
    else: right -= 1
return None
```

### Complexity
O(n) after sorting; O(n log n) if sorting is needed. O(1) auxiliary pointer state, excluding sort storage.

### Common mistake
Do not apply sum-based pointer movement to unsorted input. Original-index outputs require retaining indices before sorting.

### Follow-up
For triplets, fix one value and run the pair search on the suffix; skip duplicate values carefully.

### Practice ladder
Valid Palindrome (125) → Two Sum II - Input Array Is Sorted (167) → 3Sum (15) → Container With Most Water (11) → Trapping Rain Water (42)

## Read/write pointers & in-place compaction

### Recognize it
Remove items, deduplicate sorted data, or partition while keeping a valid prefix in the same array.

### Invariant
Before each read, [0,write) contains precisely the retained output from the already processed input. Never overwrite unread input unless the algorithm proves it safe.

### Example
For sorted [1,1,2,2,3], copy the first of each run to positions 0,1,2. Return length 3; values after that prefix are irrelevant.

### Template
```python
write = 0
for x in a:
    if write == 0 or x != a[write - 1]:
        a[write] = x
        write += 1
return write
```

### Complexity
O(n) time, O(1) auxiliary space for this sorted deduplication.

### Common mistake
This deduplication depends on sorted adjacency. Return the logical length; do not claim the array was physically resized.

### Follow-up
Allow at most k copies of each sorted value: compare x with a[write−k] once write≥k.

### Practice ladder
Remove Duplicates from Sorted Array (26) → Move Zeroes (283) → Sort Colors (75)

## Fixed-size sliding window

### Recognize it
An aggregate over every contiguous block of exactly k elements. The update must support removing the oldest item and adding the newest.

### Invariant
The maintained state describes exactly the last k elements when a window is evaluated. Sliding by one changes only the two boundaries.

### Example
For [2,1,5,1], k=2: window sums are 3,6,6. Each new sum replaces one outgoing element.

### Template
```python
# assumes 1 <= k <= len(a)
s = sum(a[:k])
best = s
for right in range(k, len(a)):
    s += a[right] - a[right-k]
    best = max(best, s)
return best
```

### Complexity
O(n) time, O(1) auxiliary sum state; frequency windows may require O(alphabet) memory.

### Common mistake
A maximum cannot simply subtract the outgoing maximum: use a monotonic deque. Validate k and avoid repeatedly slicing the full window.

### Follow-up
Anagram windows maintain character counts or a mismatch count rather than numeric sums.

### Practice ladder
Permutation in String (567) → Find All Anagrams in a String (438) → Sliding Window Maximum (239)

## Variable sliding window

### Recognize it
Longest or shortest contiguous segment satisfying a condition that can be repaired by moving one boundary forward.

### Invariant
For longest distinct substring, after shrinking, every character in [left,right] is unique. Both boundaries only advance.

### Example
For “abca”, the second a forces removal of the first a. The valid suffix becomes “bca”, and the longest length remains 3.

### Template
```python
count = {}
left = best = 0
for right, x in enumerate(a):
    count[x] = count.get(x, 0) + 1
    while count[x] > 1:
        count[a[left]] -= 1
        left += 1
    best = max(best, right-left+1)
return best
```

### Complexity
Expected O(n) time because each boundary advances at most n times; O(distinct values) space.

### Common mistake
Contiguity alone is not enough. Arbitrary signed sums do not support the usual monotone sum-window rule. Prove how validity changes.

### Follow-up
Count exactly k distinct via atMost(k)−atMost(k−1), defining atMost for negative k as zero.

### Practice ladder
Longest Substring Without Repeating Characters (3) → Minimum Size Subarray Sum (209) → Minimum Window Substring (76) → Max Consecutive Ones III (1004) → Fruit Into Baskets (904) → Subarrays with K Different Integers (992)

## Fast/slow pointers & cycle entry

### Recognize it
A linked structure or functional sequence with one successor per state; detect cycles or find a midpoint with constant memory.

### Invariant
In a cycle, the relative speed is one edge per iteration, so the two pointers eventually meet. For entry recovery, move one pointer back to the start and advance both one step.

### Example
In A→B→C→D→B, the meeting proves a cycle. Reset one pointer to A; equal-speed traversal meets at B, the cycle entry.

### Template
```python
slow = fast = head
while fast and fast.next:
    slow, fast = slow.next, fast.next.next
    if slow is fast:
        entry = head
        while entry is not slow:
            entry, slow = entry.next, slow.next
        return entry
return None
```

### Complexity
O(n) time and O(1) memory for a finite list with a possible cycle.

### Common mistake
Compare node identity, not equal node values. Floyd’s algorithm is not a generic directed-graph cycle detector with branching successors.

### Follow-up
Find cycle length by walking once around from the meeting node; find midpoint by stopping the original fast pointer.

### Practice ladder
Linked List Cycle (141) → Linked List Cycle II (142) → Middle of the Linked List (876) → Happy Number (202)

## Linked-list reversal & local rewiring

### Recognize it
Reverse a list or a segment, reorder halves, or process nodes in fixed-size groups without allocating replacements.

### Invariant
prev points to the reversed processed prefix; curr starts the untouched suffix. Save curr.next before overwriting the edge.

### Example
For 1→2→3, after processing 1: prev=1→null and curr=2→3. After processing 2: prev=2→1 and curr=3.

### Template
```python
prev, curr = None, head
while curr:
    nxt = curr.next
    curr.next = prev
    prev, curr = curr, nxt
return prev
```

### Complexity
O(n) time and O(1) extra memory.

### Common mistake
Losing the successor disconnects the suffix. Segment reversal also needs reconnection at both ends. Respect mutation permissions.

### Follow-up
Reverse only complete groups of k: first verify the group has k nodes, then reconnect its previous and following boundaries.

### Practice ladder
Reverse Linked List (206) → Reorder List (143) → Reverse Nodes in k-Group (25) → Palindrome Linked List (234)

## Merge intervals & boundary semantics

### Recognize it
Combine overlapping ranges or maintain a canonical union. Sort by starting boundary first.

### Invariant
The output contains sorted disjoint merged ranges. Only the final output interval can overlap the next sorted input interval.

### Example
[1,3],[2,5],[7,8] becomes [1,5],[7,8]. Whether [1,3] and [3,5] should merge depends on the interval contract.

### Template
```python
out = []
for start, end in sorted(intervals):
    if not out or start > out[-1][1]:
        out.append([start, end])
    else:
        out[-1][1] = max(out[-1][1], end)
return out
```

### Complexity
O(n log n) time for sorting, O(n) output storage. Template merges touching closed intervals.

### Common mistake
Closed, open, and half-open ranges differ at equal endpoints. Merging overlap is different from selecting a maximum compatible subset.

### Follow-up
Online insertion into an existing union needs predecessor/successor operations or another maintained ordered structure.

### Practice ladder
Merge Intervals (56) → Insert Interval (57) → Minimum Number of Arrows to Burst Balloons (452) → Non-overlapping Intervals (435)

## Sweep-line events

### Recognize it
Peak overlap, active bookings, skyline changes, or processing a state that changes only at endpoints.

### Invariant
After applying events at a coordinate according to the chosen tie convention, active describes exactly the current coverage.

### Example
Bookings [1,3) and [3,5) need one resource: the ending at 3 is processed before the starting at 3.

### Template
```python
events = []
for start, end in intervals:
    events += [(start, 1), (end, -1)]
active = peak = 0
for _, delta in sorted(events):
    active += delta
    peak = max(peak, active)
return peak
```

### Complexity
O(n log n) time, O(n) space for nonempty half-open intervals.

### Common mistake
Tie order is part of correctness. Skyline maximum requires a multiset/heap with expiration rather than a single count.

### Follow-up
Track the total length covered by at least k intervals by multiplying each coordinate gap by the preceding active-state condition.

### Practice ladder
Meeting Rooms III (2402) → The Skyline Problem (218) → My Calendar I (729)

## Binary search: first true boundary

### Recognize it
Sorted lookup or any false...false,true...true decision sequence with a known answer range.

### Invariant
The first qualifying position remains in [lo,hi]. Every iteration strictly reduces the interval; hi may equal n as a sentinel.

### Example
In [1,2,2,5], target 2, lower bound is 1; upper bound is 3. Changing ≥ to > changes the boundary.

### Template
```python
lo, hi = 0, len(a)
while lo < hi:
    mid = lo + (hi-lo)//2
    if a[mid] >= target:
        hi = mid
    else:
        lo = mid + 1
return lo
```

### Complexity
O(log n) comparisons, O(1) auxiliary space.

### Common mistake
Do not mix inclusive and half-open templates. An answer of n means no qualifying element; indexing a[n] is invalid.

### Follow-up
Search rotated data only after identifying which side is sorted; duplicate values can eliminate the logarithmic guarantee.

### Practice ladder
Binary Search (704) → Search Insert Position (35) → Find First and Last Position of Element in Sorted Array (34) → Search in Rotated Sorted Array (33) → Find Minimum in Rotated Sorted Array (153)

## Binary search on the answer

### Recognize it
Minimize a capacity/time or maximize a feasible threshold. A decision version is easier than directly constructing the optimum.

### Invariant
Prove feasibility is monotone and that the initial bounds contain an answer. The search cost multiplies the predicate cost.

### Example
For weights [7,2,5,10,8] in at most 2 ordered groups, capacity 17 fails and 18 works. Larger capacities cannot require more groups.

### Template
```python
# feasible is monotone; feasible(hi) is true
while lo < hi:
    mid = lo + (hi-lo)//2
    if feasible(mid):
        hi = mid
    else:
        lo = mid + 1
return lo
```

### Complexity
O(Tcheck·log R) time, plus predicate memory, for integer range width R.

### Common mistake
A good-looking predicate may not be monotone. Nonnegative-value assumptions often justify greedy checks and can fail when negatives appear.

### Follow-up
After finding the optimum, run a separate reconstruction pass to return the partition or schedule.

### Practice ladder
Koko Eating Bananas (875) → Capacity To Ship Packages Within D Days (1011) → Split Array Largest Sum (410) → Find K-th Smallest Pair Distance (719)

## Top-k with a bounded heap

### Recognize it
Only k extreme values are needed, especially from a stream where sorting everything wastes memory.

### Invariant
A size-k min-heap retains the k largest values seen. Its root is the weakest retained candidate.

### Example
For [3,1,5,2], k=2: retain [1,3], replace 1 with 5, discard 2. The retained values are 3 and 5.

### Template
```python
from heapq import heappush, heapreplace
heap = []
for x in stream:
    if len(heap) < k: heappush(heap, x)
    elif x > heap[0]: heapreplace(heap, x)
return heap  # assumes k >= 1
```

### Complexity
O(n log k) time, O(k) memory. Heap output is not sorted.

### Common mistake
Choose heap direction from which candidate you want to evict. Define ties and behavior when k exceeds the number of items.

### Follow-up
For a static kth element, compare sorting with expected-linear quickselect; selection has different worst-case guarantees.

### Practice ladder
Kth Largest Element in an Array (215) → Top K Frequent Elements (347) → K Closest Points to Origin (973) → Last Stone Weight (1046)

## K-way merge & frontier heaps

### Recognize it
Merge sorted lists/streams or repeatedly take the smallest currently available candidate from several ordered sources.

### Invariant
The heap contains the next unconsumed item from each nonempty source. The global minimum must be one of these frontier items.

### Example
Merging [1,4] and [2,3]: heap starts with 1 and 2. Pop 1, insert its successor 4; next pop 2, then 3, then 4.

### Template
```python
# heap tuples: (value, source_id, position)
while heap:
    value, source, pos = heappop(heap)
    emit(value)
    if pos+1 < len(streams[source]):
        heappush(heap, (streams[source][pos+1], source, pos+1))
```

### Complexity
O(N log k) time for N total items and k sources; O(k) frontier memory excluding output.

### Common mistake
Heap ties need comparable stable fields; comparing arbitrary node objects can fail. Do not insert an entire source at once.

### Follow-up
Stop after the first m outputs, merge lazily, or suppress duplicate values while preserving the source frontier.

### Practice ladder
Merge k Sorted Lists (23) → Find K Pairs with Smallest Sums (373) → Meeting Rooms III (2402)

## Two heaps for a running median

### Recognize it
Maintain the middle of a growing numeric stream with fast insertion and median lookup.

### Invariant
Every lower-half value ≤ every upper-half value. The lower half has either the same size or one extra item.

### Example
After 5,1,9, lower contains 1 and 5, upper contains 9; the median is 5. After 3, the median is (3+5)/2.

### Template
```python
# low is a max-heap encoded with negative values
heappush(low, -x)
heappush(high, -heappop(low))
if len(high) > len(low):
    heappush(low, -heappop(high))
median = -low[0] if len(low)>len(high) else (-low[0]+high[0])/2
```

### Complexity
O(log n) insertion, O(1) median lookup, O(n) memory.

### Common mistake
Size balance alone is insufficient: ordering across halves must also hold. Sliding expiration needs deletions/lazy invalidation.

### Follow-up
Support sliding-window medians with delayed deletion and logical heap sizes, or use an ordered multiset.

### Practice ladder
Find Median from Data Stream (295) → Kth Largest Element in an Array (215)

## Monotonic stack: next boundary

### Recognize it
Next greater/smaller element, span, or nearest blocking boundary. Store unresolved indices.

### Invariant
The stack maintains a monotone value order. When a new value resolves a previous index, that index is popped permanently.

### Example
Temperatures [70,73,71,75]: 73 resolves day 0; 75 resolves days 2 and 1. Waiting lengths are [1,2,1,0].

### Template
```python
stack = []
answer = [0]*len(a)
for i, x in enumerate(a):
    while stack and a[stack[-1]] < x:
        j = stack.pop()
        answer[j] = i-j
    stack.append(i)
return answer
```

### Complexity
O(n) total time: each index is pushed and popped at most once. O(n) memory.

### Common mistake
Choose < versus ≤ to match strictness and duplicate ownership. Histogram area requires both left and right boundaries.

### Follow-up
For circular input, scan indices twice but avoid adding duplicate unresolved originals.

### Practice ladder
Daily Temperatures (739) → Next Greater Element I (496) → Next Greater Element II (503) → Largest Rectangle in Histogram (84) → Online Stock Span (901)

## Monotonic deque: expiring extrema

### Recognize it
Maximum/minimum for every moving window, where old candidates expire and dominated newer candidates can replace weaker ones.

### Invariant
Indices increase from front to back; values decrease for a maximum deque. The front is the valid maximum; smaller older values can never win while a newer larger value survives.

### Example
[2,1,3], window 2: candidates 2,1 give max 2. On 3, both smaller candidates disappear; max becomes 3.

### Template
```python
from collections import deque
dq, result = deque(), []
for i, x in enumerate(a):
    while dq and dq[0] <= i-k: dq.popleft()
    while dq and a[dq[-1]] <= x: dq.pop()
    dq.append(i)
    if i >= k-1: result.append(a[dq[0]])
return result  # assumes 1 <= k <= len(a)
```

### Complexity
O(n) time, O(k) auxiliary memory excluding output.

### Common mistake
Keep indices to expire candidates. Prefix-sum deques use a different dominance proof than window maxima; do not reuse the code blindly.

### Follow-up
Shortest signed subarray with sum≥K uses increasing prefix values and removes qualifying starts from the front.

### Practice ladder
Sliding Window Maximum (239) → Shortest Subarray with Sum at Least K (862)

## DFS with subtree summaries

### Recognize it
Tree height, diameter, path contribution, or combining answers from independent child subtrees.

### Invariant
The return value has one exact meaning usable by the parent; a global result may use a richer combination. Postorder computes children first.

### Example
For diameter, return height to the parent and combine leftHeight+rightHeight at the current node. A branch passed upward cannot include both children.

### Template
```python
best = 0
def height(node):
    nonlocal best
    if node is None: return 0
    left, right = height(node.left), height(node.right)
    best = max(best, left+right)
    return 1+max(left, right)
# nested inside an outer function; diameter measured in edges
```

### Complexity
O(n) time and O(h) call-stack space; h can equal n.

### Common mistake
Do not recompute each subtree height independently. Return states for maximum path sum must distinguish a chain from a completed fork.

### Follow-up
For every possible root, use a second rerooting pass rather than repeating DFS n times.

### Practice ladder
Maximum Depth of Binary Tree (104) → Diameter of Binary Tree (543) → Balanced Binary Tree (110) → Binary Tree Maximum Path Sum (124) → House Robber III (337) → Sum of Distances in Tree (834)

## BFS: levels, multi-source & expanded state

### Recognize it
Fewest transitions with equal edge cost, nearest source, contagion spread, or shortest routes in a state space.

### Invariant
The queue processes states in nondecreasing distance. Mark on enqueue so the same state is not queued repeatedly.

### Example
With two initial sources, enqueue both at distance zero. Every cell is reached from the nearest source in a single traversal.

### Template
```python
from collections import deque
dist = {s: 0 for s in sources}
q = deque(sources)
while q:
    u = q.popleft()
    for v in neighbors(u):
        if v not in dist:
            dist[v] = dist[u]+1
            q.append(v)
return dist
```

### Complexity
O(V+E) time and O(V) state memory with adjacency lists. Expanded states increase V and E.

### Common mistake
Different edge weights invalidate ordinary BFS shortest paths. A cell-only visited set is wrong when keys/budgets change future choices.

### Follow-up
Include remaining wall removals or a key mask in the state; prove dominance before pruning one arrival in favor of another.

### Practice ladder
Binary Tree Level Order Traversal (102) → Rotting Oranges (994) → 01 Matrix (542) → Shortest Path in Binary Matrix (1091) → Shortest Path in a Grid with Obstacles Elimination (1293) → Shortest Path to Get All Keys (864)

## Topological order & DAG processing

### Recognize it
Prerequisite ordering, dependency resolution, or DP over a directed acyclic graph.

### Invariant
Every dequeued zero-indegree vertex has no remaining unmet predecessor. Removing its outgoing edges unlocks exactly the newly ready vertices.

### Example
Edges A→C and B→C require A and B before C; either order for A and B is legal. A cycle prevents all vertices from being removed.

### Template
```python
q = deque(v for v in vertices if indegree[v] == 0)
order = []
while q:
    u = q.popleft(); order.append(u)
    for v in adj[u]:
        indegree[v] -= 1
        if indegree[v] == 0: q.append(v)
return order if len(order)==len(vertices) else None
```

### Complexity
O(V+E) time, O(V) auxiliary state beyond the graph.

### Common mistake
A directed graph is not automatically a DAG. Include isolated vertices, and keep indegrees consistent with duplicate-edge representation.

### Follow-up
Propagate longest prerequisite completion time along topological order; earliest lexicographic ordering uses a heap of ready vertices.

### Practice ladder
Course Schedule (207) → Course Schedule II (210) → Find Eventual Safe States (802)

## Dijkstra & nonnegative path relaxation

### Recognize it
Minimum cost over arbitrary nonnegative edges. Distances, not traversal depth, determine the next frontier state.

### Invariant
The smallest nonstale distance popped is final: any alternative path through an unprocessed vertex cannot become cheaper through nonnegative edges.

### Example
Edges S→A=8, S→B=2, B→A=1: A is first proposed at 8, then improved to 3 through B. Ignore its stale heap entry at 8.

### Template
```python
dist, heap = {s: 0}, [(0, s)]
while heap:
    d, u = heappop(heap)
    if d != dist[u]: continue
    for v, w in adj[u]:
        nd = d+w
        if nd < dist.get(v, float('inf')):
            dist[v] = nd
            heappush(heap, (nd, v))
return dist
```

### Complexity
Lazy-heap bound O((V+E) log(V+E)), O(V+E) memory; tighter standard bounds depend on graph/heap assumptions.

### Common mistake
Negative edges break finalization. Edge-count restrictions or coupons require additional state, not just a different relaxation constant.

### Follow-up
For edge weights 0/1 use a deque; for minimax cost replace addition by max and prove monotonic extension.

### Practice ladder
Network Delay Time (743) → Path With Minimum Effort (1631) → Swim in Rising Water (778) → Cheapest Flights Within K Stops (787) → Minimum Cost to Make at Least One Valid Path in a Grid (1368)

## Union-find & offline connectivity

### Recognize it
Components under edge additions, cycle detection in undirected graphs, Kruskal, or offline threshold queries.

### Invariant
Each component is represented by one root. Union by size/rank limits tree growth; path compression shortens future root lookups.

### Example
Union (0,1), then (1,2). A new edge (0,2) connects vertices already in the same component and closes a cycle.

### Template
```python
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x
def union(a,b):
    a,b = find(a),find(b)
    if a==b: return False
    if size[a] < size[b]: a,b = b,a
    parent[b]=a; size[a]+=size[b]
    return True
```

### Complexity
Amortized O(α(n)) per operation with both optimizations; O(n) memory.

### Common mistake
DSU parents are not graph paths. Basic DSU does not support arbitrary edge deletion or directed reachability.

### Follow-up
Sort threshold queries and add eligible edges incrementally, then restore the original query order.

### Practice ladder
Redundant Connection (684) → Accounts Merge (721) → Number of Operations to Make Network Connected (1319) → Min Cost to Connect All Points (1584) → Checking Existence of Edge Length Limited Paths (1697)

## Backtracking: choose, explore, undo

### Recognize it
Enumerate combinations, assignments, paths, or partitions under constraints. The search tree is manageable or pruning makes it so.

### Invariant
At entry, the path and auxiliary state describe exactly the decisions made so far. Every recursive branch restores shared state before returning.

### Example
For subsets of [A,B], decide skip/take A, then skip/take B, producing [],[B],[A],[A,B]. Copy each output path.

### Template
```python
result, path = [], []
def visit(i):
    if i == len(a):
        result.append(path.copy()); return
    visit(i+1)
    path.append(a[i])
    visit(i+1)
    path.pop()
visit(0)
return result
```

### Complexity
Subset materialization takes O(n·2^n) time/output; recursion and path use O(n) extra space.

### Common mistake
Do not store the same mutable path reference repeatedly. Duplicate suppression at one recursion depth differs from banning a value everywhere.

### Follow-up
Memoize only when states truly have identical future possibilities; output enumeration may still require materializing every answer.

### Practice ladder
Subsets (78) → Permutations (46) → Combination Sum (39) → Generate Parentheses (22) → Word Search (79) → N-Queens (51)

## Linear DP: take/skip & local state

### Recognize it
A sequence of decisions where only a small boundary state influences the next choice: adjacency restrictions, running optimum, or finite states.

### Invariant
Each state has an explicit meaning over a processed prefix. All legal final decisions are covered by the transition.

### Example
House values [2,7,9,3,1] give prefix optima 0,2,7,11,11,12. Taking a house combines its value with the optimum two positions earlier.

### Template
```python
two_back = one_back = 0
for value in houses:
    current = max(one_back, two_back+value)
    two_back, one_back = one_back, current
return one_back  # taking no house is permitted
```

### Complexity
O(n) time, O(1) auxiliary memory when only the optimum value is required.

### Common mistake
Rolling variables lose reconstruction information. A trading process needs held/not-held and possibly budget/cooldown states.

### Follow-up
Return selected positions with a decision table, or enforce a circular first/last conflict by solving two linear cases.

### Practice ladder
Climbing Stairs (70) → House Robber (198) → House Robber II (213) → Maximum Subarray (53) → Maximum Product Subarray (152) → Best Time to Buy and Sell Stock with Cooldown (309)

## 0/1 knapsack & subset-sum DP

### Recognize it
Choose each item at most once under an integer capacity or target sum; multiple subsets reach the same state.

### Invariant
During an item update, descending capacities ensure dp[c−w] still refers to the previous item set, preventing reuse.

### Example
For weights [2,3], target 4 is unreachable if each item is used once. An ascending update would incorrectly reuse weight 2.

### Template
```python
reachable = [False]*(target+1)
reachable[0] = True
for w in weights:
    for s in range(target, w-1, -1):
        reachable[s] |= reachable[s-w]
return reachable[target]  # nonnegative integer weights
```

### Complexity
O(n·target) time and O(target) memory; pseudopolynomial in numeric target, not its bit length.

### Common mistake
Negative weights need a different range/model. Distinguish exactly a capacity from at most a capacity, and impossible from zero-valued.

### Follow-up
Track count of chosen items or reconstruct a subset; large targets may favor meet-in-the-middle or sparse reachable states.

### Practice ladder
Partition Equal Subset Sum (416) → Target Sum (494) → Last Stone Weight II (1049)

## Unbounded DP & combination counting

### Recognize it
Items/denominations may be reused. Ask whether the output is a minimum, a count of unordered combinations, or ordered sequences.

### Invariant
For combination counts, process denominations outside and amounts ascending inside: every combination is constructed in denomination order.

### Example
Coins [1,2], amount 3 has two combinations {1,1,1},{1,2}, but three ordered sequences because [1,2] and [2,1] differ.

### Template
```python
ways = [0]*(amount+1)
ways[0] = 1
for coin in coins:
    for s in range(coin, amount+1):
        ways[s] += ways[s-coin]
return ways[amount]  # distinct positive denominations
```

### Complexity
O(number of coins · amount) arithmetic operations, O(amount) memory. Large exact counts increase integer arithmetic cost.

### Common mistake
Swapping loop order changes combinations to sequences. Zero/negative denominations can destroy termination or make counts infinite.

### Follow-up
For minimum coins use min(dp[s],dp[s−coin]+1) and an unreachable sentinel; counts and minima use different base cases.

### Practice ladder
Coin Change (322) → Coin Change II (518) → Word Break (139)

## Two-sequence DP & alignment

### Recognize it
Compare prefixes of two sequences, align them, count matches, or minimize edit operations.

### Invariant
dp[i][j] summarizes exactly the first i and j elements. Each transition reduces at least one prefix length.

### Example
For “abc” and “ac”, the common subsequence is “ac” with length 2. Equal final characters extend the smaller prefix-pair optimum.

### Template
```python
dp = [[0]*(len(b)+1) for _ in range(len(a)+1)]
for i in range(1,len(a)+1):
    for j in range(1,len(b)+1):
        if a[i-1]==b[j-1]: dp[i][j]=1+dp[i-1][j-1]
        else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])
return dp[-1][-1]
```

### Complexity
O(nm) time/memory; rolling rows reduce length-only space to O(min(n,m)).

### Common mistake
Substring requires contiguity; subsequence does not. Edit distance and distinct-subsequence counts need different recurrences.

### Follow-up
Backtrack the full table to reconstruct one alignment; define tie rules for deterministic output.

### Practice ladder
Longest Common Subsequence (1143) → Edit Distance (72) → Distinct Subsequences (115) → Interleaving String (97)

## Interval DP: split or choose last

### Recognize it
An optimum over contiguous intervals decomposes at a split, or choosing the last action makes boundaries fixed.

### Invariant
Smaller intervals are solved before larger ones. The state includes the boundary context required to combine independent subproblems.

### Example
In balloon removal, choosing the last removed interior balloon means its neighbors are the interval’s surviving boundaries. Choosing the first leaves changing context.

### Template
```python
# schematic minimization recurrence; problem supplies split_cost
for length in range(2,n+1):
    for left in range(n-length+1):
        right = left+length-1
        dp[left][right] = min(
            dp[left][k] + dp[k+1][right] + split_cost(left,k,right)
            for k in range(left,right))
```

### Complexity
Commonly O(n³) time and O(n²) space: n² intervals times n split candidates.

### Common mistake
The cost function and base cases are problem-specific. Do not copy an interval skeleton without proving independent subproblems.

### Follow-up
Recover the split tree; examine whether special structure permits a faster optimization before claiming one.

### Practice ladder
Burst Balloons (312) → Minimum Cost to Cut a Stick (1547) → Longest Palindromic Subsequence (516)

## Bitmask state & subset search

### Recognize it
Small sets of visited vertices or acquired skills; future choices depend on the subset and often an endpoint.

### Invariant
Each bit has a fixed meaning. A state must also retain any context, such as last vertex, that changes future transitions.

### Example
For visiting all three vertices, mask 101 records vertices 0 and 2. Being at 0 or at 2 can yield different next costs despite the same mask.

### Template
```python
# schematic transition for (visited mask, endpoint)
for mask in range(1<<n):
    for u in range(n):
        if not (mask>>u)&1: continue
        for v in neighbors(u):
            nxt = mask | (1<<v)
            relax((mask,u), (nxt,v))
```

### Complexity
Up to n·2^n states. Work depends on transitions; graph-walk BFS commonly uses O(2^n E) time.

### Common mistake
Numeric mask order is not always a valid DP order when revisits keep the same mask; use BFS/Dijkstra over states when needed.

### Follow-up
For small skill coverage, map skills to bits and retain the smallest team for each coverage mask.

### Practice ladder
Shortest Path Visiting All Nodes (847) → Smallest Sufficient Team (1125)

## Trie: shared-prefix search

### Recognize it
Many words share prefixes; need exact lookup, prefix lookup, or search across a dictionary.

### Invariant
Every node represents one prefix. A terminal marker distinguishes a complete stored word from a prefix only.

### Example
After storing “car” and “cart”, the nodes c→a→r are shared. The r node and the following t node are both terminal.

### Template
```python
END = object()
root = {}
for word in words:
    node = root
    for ch in word:
        node = node.setdefault(ch,{})
    node[END] = True
# search walks edges; exact search also checks END
```

### Complexity
O(L) expected edge-map work per exact lookup of length L; memory O(total stored characters).

### Common mistake
Wildcard search branches and may inspect many nodes. Prefix existence is not exact-word existence; choose alphabet and normalization rules.

### Follow-up
Board word search combines trie traversal with backtracking and per-path visited cells.

### Practice ladder
Implement Trie (Prefix Tree) (208) → Design Add and Search Words Data Structure (211) → Word Search II (212)

## Greedy choice & exchange argument

### Recognize it
A local choice may safely lead to an optimum. You need a proof that an optimal solution can include that choice.

### Invariant
For maximum count of nonoverlapping intervals, the chosen set ends as early as possible for its size, leaving maximal future room.

### Example
Choosing [1,3) instead of [1,10) preserves room for [3,4),[4,5). Replacing the first interval of an optimum with an earlier-ending one cannot hurt later choices.

### Template
```python
last_end = float('-inf')
chosen = []
for start,end in sorted(intervals,key=lambda p:p[1]):
    if start >= last_end:
        chosen.append((start,end))
        last_end = end
return chosen
```

### Complexity
O(n log n) sorting plus O(n) scan, with O(n) output storage.

### Common mistake
Unequal interval values invalidate maximum-count greedy logic. Coin systems such as [1,3,4] defeat largest-first for amount 6.

### Follow-up
Replace interval counts with values: use weighted interval scheduling DP and predecessor search.

### Practice ladder
Non-overlapping Intervals (435) → Jump Game (55) → Jump Game II (45) → Gas Station (134) → Maximum Profit in Job Scheduling (1235)

## Fenwick tree & compressed ranks

### Recognize it
Interleaved point updates and prefix/range sums, or counts of values smaller than a threshold in a known value universe.

### Invariant
tree[i] aggregates the block of size lowbit(i) ending at i. Query subtracts lowbit; update adds it to reach containing blocks.

### Example
To count smaller values to the right of [5,2,6,1], scan backward, query rank−1, then insert rank. The answers are [2,1,1,0].

### Template
```python
def add(i,delta):  # 1-based i
    while i <= n:
        bit[i] += delta
        i += i & -i
def prefix(i):
    total = 0
    while i > 0:
        total += bit[i]
        i -= i & -i
    return total
```

### Complexity
O(log n) update/query, O(n) memory. Coordinate compression typically costs O(n log n).

### Common mistake
Updating index zero never advances. Compression preserves order, not numeric distance. Subtracting prefix aggregates requires a suitable operation.

### Follow-up
For general associative range aggregates or range updates, compare segment-tree and lazy-propagation designs.

### Practice ladder
Range Sum Query - Mutable (307) → Count of Smaller Numbers After Self (315) → Reverse Pairs (493) → Count of Range Sum (327)

## KMP: reuse borders on mismatch

### Recognize it
Exact linear-time pattern matching when repeated prefix work causes naive rescanning.

### Invariant
j is the length of the currently matched proper prefix/border. On mismatch, only a border of that prefix can remain a valid candidate.

### Example
For “ababa”, prefix-function values are [0,0,1,2,3]. The final border “aba” is reused when continuing a search.

### Template
```python
pi = [0]*len(s)
for i in range(1,len(s)):
    j = pi[i-1]
    while j > 0 and s[i] != s[j]:
        j = pi[j-1]
    if s[i] == s[j]: j += 1
    pi[i] = j
return pi
```

### Complexity
O(n) time and O(n) memory for the prefix function; matching is O(text length + pattern length).

### Common mistake
Fallback is pi[j−1], not simply j−1. Define empty-pattern behavior. Hash-based alternatives may need collision verification.

### Follow-up
Find overlapping matches by falling back to the matched pattern’s longest proper border after a full match.

### Practice ladder
Find the Index of the First Occurrence in a String (28) → Repeated String Match (686) → Shortest Palindrome (214)

## Tree rerooting

### Recognize it
Compute an answer for every root when moving across an edge changes the answer predictably. Start with subtree summaries and one root answer.

### Invariant
The child subtree and its complement partition all vertices. Moving the root to a child makes its subtree closer and every other vertex farther.

### Example
Path 0—1—2 has distance sums [3,2,3]. With size[1]=2, moving from 0 to 1 changes 3 by 3−2·2=−1.

### Template
```python
# tree rooted at 0; size from postorder; answer[0] from root distances
for u in parent_before_child_order:
    for v, weight in children[u]:
        answer[v] = answer[u] + weight*(n-2*size[v])
```

### Complexity
O(n) time and O(n) storage after two tree traversals.

### Common mistake
The formula assumes a tree. General graphs have alternate routes. Recursive DFS may overflow on a long chain; use iterative parent/order construction.

### Follow-up
For demand-weighted distances, replace subtree size with subtree demand and n with total demand.

### Practice ladder
Sum of Distances in Tree (834) → Diameter of Binary Tree (543)

## Binary lifting & lowest common ancestors

### Recognize it
Many ancestor or LCA queries on one static rooted tree. A single query may be simpler with ordinary traversal.

### Invariant
up[v][j] is the 2^j-th ancestor. Doubling combines two jumps of half that length. After equalizing depths, lift both vertices without passing their LCA.

### Example
A jump of 13 edges is 8+4+1. On a chain, this takes three table lookups rather than thirteen parent steps.

### Template
```python
# root is its own parent; LOG covers maximum depth
for v in vertices: up[v][0] = parent[v]
for j in range(1, LOG):
    for v in vertices:
        up[v][j] = up[up[v][j-1]][j-1]
def kth(v, k):
    if k > depth[v]: return None
    for j in range(LOG):
        if (k >> j) & 1: v = up[v][j]
    return v
```

### Complexity
O(n log n) preprocessing/memory; O(log n) ancestor or LCA query.

### Common mistake
Check k against depth before jumping. Root conventions must be consistent. Static tables become stale when the tree changes.

### Follow-up
Store a max/sum aggregate alongside each jump to answer weighted path queries through the LCA.

### Practice ladder
Kth Ancestor of a Tree Node (1483) → Lowest Common Ancestor of a Binary Tree (236) → Lowest Common Ancestor of a Binary Search Tree (235)

## Tree DP: conditional subtree choices

### Recognize it
Choices inside separate child subtrees become independent once the current node’s state is fixed.

### Invariant
For independent-set value, take[u] includes u and excludes all children; skip[u] excludes u and independently chooses the better state for each child.

### Example
Root value 3 with leaf children 4 and 5: taking the root gives 3; skipping it gives 9. Return both possibilities to the parent.

### Template
```python
def solve(u, parent):
    take, skip = value[u], 0
    for v in adj[u]:
        if v == parent: continue
        child_take, child_skip = solve(v, u)
        take += child_skip
        skip += max(child_take, child_skip)
    return take, skip
# answer = max(solve(root, -1)); empty selection permitted
```

### Complexity
O(n) time, O(h) call stack for this two-state tree DP; larger state spaces increase transition cost.

### Common mistake
A general graph’s children are not independent subproblems. Do not memoize only a vertex when external boundary constraints change its meaning.

### Follow-up
Require exactly k chosen vertices: merge child tables by selected count and account for the convolution cost.

### Practice ladder
House Robber III (337) → Binary Tree Maximum Path Sum (124) → Sum of Distances in Tree (834)

## 0–1 BFS

### Recognize it
Shortest paths where every edge cost is exactly 0 or 1. Zero-cost transitions should be processed ahead of one-cost transitions.

### Invariant
The deque processes nonstale states in nondecreasing tentative distance. Relaxation is still required: the first discovered path may not be cheapest.

### Example
S→A costs 1, S→B costs 0, B→A costs 0. A must improve from 1 to 0; a visited-on-discovery rule would reject that improvement.

### Template
```python
from collections import deque
dist = [float('inf')]*n; dist[s] = 0
q = deque([(s,0)])
while q:
    u,d = q.popleft()
    if d != dist[u]: continue
    for v,w in adj[u]:
        if d+w < dist[v]:
            dist[v] = d+w
            if w == 0: q.appendleft((v,d))
            else: q.append((v,d+1))
```

### Complexity
O(V+E) time and O(V+E) memory including graph and queued entries.

### Common mistake
The deque rule is specific to weights 0/1. With arbitrary positive weights, use Dijkstra. Queue entries need stale-state handling in this formulation.

### Follow-up
For small bounded integer weights, investigate bucket-based shortest paths and account for the weight bound.

### Practice ladder
Minimum Cost to Make at Least One Valid Path in a Grid (1368) → Shortest Path in a Grid with Obstacles Elimination (1293) → Network Delay Time (743)

## Minimum spanning tree: cut property

### Recognize it
Connect all vertices in an undirected weighted graph with minimum total edge weight. This is different from minimizing distances from one source.

### Invariant
For any cut, a lightest edge crossing that cut can belong to an MST. Kruskal adds the cheapest edge joining two distinct components.

### Example
Triangle weights 1,2,10: add the edges of weights 1 and 2; the edge of weight 10 joins vertices already connected and is rejected.

### Template
```python
total, chosen = 0, []
for weight,u,v in sorted(edges):
    if union(u,v):  # DSU union returns true only when components merge
        total += weight
        chosen.append((u,v))
if len(chosen) != n-1: return None  # n >= 1
return total, chosen
```

### Complexity
O(E log E) sorting plus near-linear DSU work, O(V+E) memory with edge storage.

### Common mistake
A disconnected graph yields a forest, not a spanning tree. Negative weights are allowed for MST even though ordinary Dijkstra forbids them.

### Follow-up
Compare Prim for dense/implicit graphs; explain the minimum-bottleneck property for threshold connectivity.

### Practice ladder
Min Cost to Connect All Points (1584) → Checking Existence of Edge Length Limited Paths (1697) → Swim in Rising Water (778)

## Bridges & articulation points

### Recognize it
Identify edges or vertices whose removal disconnects an undirected graph. Use DFS discovery times and reachable ancestors.

### Invariant
low[v] is the earliest discovery time reachable from v’s DFS subtree using tree edges and at most one back edge. A tree edge u→v is a bridge iff low[v] > tin[u].

### Example
A triangle has no bridge because every tree edge has an alternate route. Attach one leaf to it: that leaf edge is a bridge.

### Template
```python
def dfs(u, parent_edge):
    tin[u] = low[u] = next_time()
    for v, edge_id in adj[u]:
        if edge_id == parent_edge: continue
        if tin[v] != -1:
            low[u] = min(low[u], tin[v])
        else:
            dfs(v, edge_id)
            low[u] = min(low[u], low[v])
            if low[v] > tin[u]: bridges.append(edge_id)
# start DFS from every unvisited vertex
```

### Complexity
O(V+E) time and O(V) auxiliary arrays/stack.

### Common mistake
Skip the parent edge by ID, not every edge to the parent, or parallel edges give false bridges. A root articulation point needs at least two DFS children; nonroots use low[child] ≥ tin[u].

### Follow-up
Compress non-bridge-connected regions into a bridge tree and reason about failure-tolerant connectivity.

### Practice ladder
Critical Connections in a Network (1192) → Minimum Number of Days to Disconnect Island (1568)

## Strongly connected components

### Recognize it
Group directed vertices that can mutually reach one another; collapse cyclic dependencies into a DAG.

### Invariant
Kosaraju first records finish order on the original graph. Traversing the transpose in reverse finish order extracts one maximal mutually reachable component at a time.

### Example
Edges A→B, B→A, B→C produce components {A,B} and {C}; the condensation graph has one edge from the first component to the second.

### Template
```python
order, seen = [], set()
def first(u):
    seen.add(u)
    for v in adj[u]:
        if v not in seen: first(v)
    order.append(u)
for u in vertices:
    if u not in seen: first(u)
# Clear visited; run DFS on reverse_adj in reversed(order).
# Assign a fresh component ID for each new DFS root.
```

### Complexity
O(V+E) time and O(V+E) memory when storing the transpose.

### Common mistake
Directed reachability is not equivalence until both directions hold. Ordinary undirected DSU does not find SCCs. Reverse finish order is essential.

### Follow-up
Build the condensation DAG, deduplicate component edges, then perform dependency DP. 2-SAT reduces satisfiability to SCC conflicts.

### Practice ladder
Find Eventual Safe States (802) → Course Schedule II (210) → Maximum Employees to Be Invited to a Meeting (2127)

## Grid DP & obstacle states

### Recognize it
Movement on a grid is acyclic, such as only right/down, so each cell depends on already processed neighbors.

### Invariant
dp[r][c] counts paths or stores optimal cost to exactly that cell under the specified move set. Obstacles are unreachable, not ordinary zero-cost cells.

### Example
A 2×3 empty grid has three right/down paths. Blocking its top-middle cell leaves one path through the bottom row.

### Template
```python
dp = [0]*cols
dp[0] = 1
for r in range(rows):
    for c in range(cols):
        if blocked[r][c]: dp[c] = 0
        elif c > 0: dp[c] += dp[c-1]
return dp[-1]  # nonempty grid; right/down moves only
```

### Complexity
O(rows·cols) time, O(cols) memory for path count; big integer arithmetic may add cost.

### Common mistake
Allowing arbitrary directions creates cycles and usually calls for graph search instead. Rolling rows discard path reconstruction information.

### Follow-up
Permit one obstacle removal: add a remaining-budget dimension; if movement is no longer acyclic, use expanded-state BFS.

### Practice ladder
Unique Paths (62) → Unique Paths II (63) → Minimum Path Sum (64) → Triangle (120)

## Longest increasing subsequence

### Recognize it
Select a noncontiguous sequence with ordered values; optimize its length or count. Clarify strict versus nondecreasing order.

### Invariant
tails[k] is the smallest possible last value of a strictly increasing subsequence of length k+1 among processed items. Smaller tails preserve more extension opportunities.

### Example
For [3,1,2], tails evolves [3]→[1]→[1,2]. Replacing 3 with 1 does not lose a length-one option; it improves its future potential.

### Template
```python
from bisect import bisect_left
tails = []
for x in a:
    i = bisect_left(tails,x)
    if i == len(tails): tails.append(x)
    else: tails[i] = x
return len(tails)
```

### Complexity
O(n log n) time, O(n) memory. Basic dp[i]=1+max(dp[j]) for j<i,a[j]<a[i] costs O(n²).

### Common mistake
The tails array is not necessarily an actual subsequence. Use predecessor indices for reconstruction. Nondecreasing LIS uses upper bound, not lower bound.

### Follow-up
Count optimal subsequences with length/count states; sorting multidimensional envelopes needs tie rules that prevent illegal equal-width chains.

### Practice ladder
Longest Increasing Subsequence (300) → Number of Longest Increasing Subsequence (673) → Russian Doll Envelopes (354)

## Palindrome DP & center expansion

### Recognize it
Palindrome substring/subsequence length, counting, or partitions. First distinguish contiguous substrings from subsequences.

### Invariant
A substring [l,r] is palindromic iff endpoints match and its interior is palindromic (or has length at most one). Process short intervals before long ones.

### Example
For “abba”, matching outer a values rely on interior “bb”. Center expansion must consider both odd centers and the even center between the b values.

### Template
```python
pal = [[False]*n for _ in range(n)]
for length in range(1,n+1):
    for l in range(n-length+1):
        r = l+length-1
        pal[l][r] = s[l]==s[r] and (length<=2 or pal[l+1][r-1])
```

### Complexity
O(n²) time/memory for the table. Center expansion uses O(1) auxiliary space and O(n²) worst-case time.

### Common mistake
Longest palindromic subsequence uses max(skip left, skip right) when endpoints differ; substring validity does not. Never mix those recurrences.

### Follow-up
Use the palindrome table to minimize partition cuts, or learn Manacher only when linear-time palindrome radii are required.

### Practice ladder
Longest Palindromic Substring (5) → Palindromic Substrings (647) → Longest Palindromic Subsequence (516) → Palindrome Partitioning (131) → Palindrome Partitioning II (132)

## State-machine DP

### Recognize it
Sequential decisions with a small number of modes: holding/not holding, cooldown, transaction budget, or alternating allowed actions.

### Invariant
Each state stores the best value after the processed prefix in that exact mode. Transitions use previous-step values and only legal actions.

### Example
For prices [1,3,2,5] and fee 1, a buy at 1 and sell at 5 yields 3. Two completed trades also yield 3; transaction accounting must be consistent.

### Template
```python
cash, hold = 0, float('-inf')
for price in prices:
    old_cash, old_hold = cash, hold
    cash = max(old_cash, old_hold+price-fee)
    hold = max(old_hold, old_cash-price)
return cash  # at most one held share; unlimited trades
```

### Complexity
O(n·number of states·transitions per state); two-state trading is O(n) time, O(1) memory.

### Common mistake
Using already-updated values can allow unintended same-step transitions. Impossible states start at −∞ for maximization; zero can fabricate a free holding.

### Follow-up
Add a cooldown mode or remaining transaction count; specify whether the count changes on buying or selling.

### Practice ladder
Best Time to Buy and Sell Stock with Cooldown (309) → Best Time to Buy and Sell Stock with Transaction Fee (714) → Best Time to Buy and Sell Stock IV (188)

## Digit DP

### Recognize it
Count integers in a huge numeric interval satisfying digit-based properties without enumerating every integer.

### Invariant
State (position,tight,started,property) summarizes the already chosen prefix. tight restricts the next digit to the bound; started distinguishes leading zeros from actual digits.

### Example
For counting positive values ≤25 with no repeated digits, prefix 2 forces the next digit ≤5; prefix 1 allows any digit. Leading zeros must not consume digit 0 in the used mask.

### Template
```python
@cache
def count(pos, tight, started, mask):
    if pos == len(digits): return int(started)
    limit = digits[pos] if tight else 9
    total = 0
    for d in range(limit+1):
        nt = tight and d == digits[pos]
        if not started and d == 0:
            total += count(pos+1, nt, False, mask)
        elif not (mask >> d) & 1:
            total += count(pos+1, nt, True, mask | (1<<d))
    return total
```

### Complexity
For the distinct-digit mask example: O(D·2^10·10) time up to constant flags, O(D·2^10) memo space. Other properties have other state counts.

### Common mistake
Decide whether zero counts. Rebuild/clear bound-specific caches when computing F(R) and F(L−1). A property state must contain all future-relevant information.

### Follow-up
Replace the used-digit mask with digit-sum modulo m, an automaton state for forbidden substrings, or both; multiply state-space costs.

### Practice ladder
Numbers With Repeated Digits (1012) → Count Special Integers (2376) → Numbers At Most N Given Digit Set (902)

## Meet in the middle

### Recognize it
Subset enumeration is too large at 2^n but feasible at roughly 2^(n/2), often when n is around 40 and constraints fit memory.

### Invariant
Every full subset uniquely splits into a subset of the left half and one of the right half. Combine summaries instead of enumerating all cross products.

### Example
For [2,5,−3,7] and goal 4, choose the empty left subset and both right values. Right-half sums are 0,−3,7,4; binary search finds the required complement 4.

### Template
```python
def sums(a):
    out = [0]
    for x in a: out += [s+x for s in out]
    return out
left = sums(a[:len(a)//2])
right = sorted(sums(a[len(a)//2:]))
# For each x in left, binary-search goal-x in right.
# Check insertion position and its predecessor for closest sum.
```

### Complexity
O(n·2^(n/2)) time with sorting/search and O(2^(n/2)) memory, up to uneven halves.

### Common mistake
Do not combine every pair: that restores 2^n work. Empty subsets, negatives, and exact cardinality alter the matching conditions.

### Follow-up
For exactly k chosen elements, group half-subset sums by cardinality and combine groups whose sizes sum to k.

### Practice ladder
Closest Subsequence Sum (1755) → Partition Array Into Two Arrays to Minimize Sum Difference (2035)

## Segment tree: associative range queries

### Recognize it
Point updates plus range sums/minima/maxima or custom associative summaries. Choose an identity and merge operation.

### Invariant
Each internal node is the merge of its two children. A query partitions the requested interval into disjoint stored segments; preserve order for noncommutative merges.

### Example
For [2,1,4,3], query [1,3) returns 1+4=5. Updating index 2 to 7 changes only nodes on its root path.

### Template
```python
# iterative sum tree; leaves at n..2n-1; query [l,r)
def query(l,r):
    l += n; r += n; answer = 0
    while l < r:
        if l & 1: answer += tree[l]; l += 1
        if r & 1: r -= 1; answer += tree[r]
        l //= 2; r //= 2
    return answer
```

### Complexity
O(n) build, O(log n) point update/query, O(n) memory.

### Common mistake
Associativity is required; commutativity is not. For ordered merges, accumulate left and right answers separately. Use consistent inclusive/exclusive boundaries.

### Follow-up
Augment nodes with prefix/suffix/best-subarray summaries; prove the merge computes the combined segment correctly.

### Practice ladder
Range Sum Query - Mutable (307) → Falling Squares (699) → Count of Smaller Numbers After Self (315)

## Lazy propagation: deferred range updates

### Recognize it
Many range updates and range queries; pushing each update to every element would be too slow.

### Invariant
A node’s aggregate already includes its pending tag, while descendants may not. Push before inspecting children; combine tags in chronological order.

### Example
Adding 3 to a length-four segment increases its sum by 12. Store the +3 tag at that node; its children receive it only when a later operation descends.

### Template
```python
def apply(node, length, delta):
    total[node] += length*delta
    lazy[node] += delta
def push(node, left_length, right_length):
    apply(2*node, left_length, lazy[node])
    apply(2*node+1, right_length, lazy[node])
    lazy[node] = 0
# Fully covered update: apply; partial cover: push, recurse, pull.
```

### Complexity
O(log n) per range-add/range-sum operation, O(n) space, with a correct compatible lazy design.

### Common mistake
Not every update has a simple lazy action. Assignment and addition tags compose differently; zero cannot mean “no pending assignment” if assigning zero is legal.

### Follow-up
Support affine updates x→a·x+b: sum becomes a·sum+b·length and tag composition order matters.

### Practice ladder
Falling Squares (699) → Range Sum Query - Mutable (307)

## Difference arrays & range increments

### Recognize it
Many range additions followed by one final materialization, or static coverage counts. Online aggregate queries may require a tree instead.

### Invariant
A range increment starts contributing at its left boundary and stops immediately after its right boundary. Prefix accumulation reconstructs each value.

### Example
Start [0,0,0,0], add 2 over [1,3): differences [0,2,0,−2,0] reconstruct [0,2,2,0].

### Template
```python
diff = [0]*(n+1)
for l,r,delta in updates:  # half-open [l,r)
    diff[l] += delta
    diff[r] -= delta
running = 0
for i in range(n):
    running += diff[i]
    a[i] += running
```

### Complexity
O(q+n) time, O(n) extra space for q updates and final reconstruction.

### Common mistake
Off-by-one cancellation is the common bug. Range assignment is not range addition. Interleaved sum queries need an appropriate online structure.

### Follow-up
A Fenwick tree over differences supports range add and point query; two Fenwick trees can support range add plus range sum.

### Practice ladder
Corporate Flight Bookings (1109) → Car Pooling (1094) → Shifting Letters II (2381)

## Cyclic placement & index-as-a-bucket

### Recognize it
Array values come from a small integer domain naturally mapped to indices; detect missing/duplicate values with limited extra memory.

### Invariant
Each successful swap places at least one in-range value at its home index. Duplicate guards prevent endless swaps between equal values.

### Example
For [3,1,2], value 3 belongs at index 2, then value 2 at index 1, yielding [1,2,3]. For [1,1], the equality guard stops immediately.

### Template
```python
for i in range(n):
    while 1 <= a[i] <= n and a[a[i]-1] != a[i]:
        j = a[i]-1
        a[i],a[j] = a[j],a[i]
# A mismatch a[i] != i+1 reveals a missing home value.
```

### Complexity
O(n) time and O(1) extra space: successful placements are bounded by n.

### Common mistake
Only index after checking range. Mutation must be allowed. Values outside the assumed domain require rejection or separate treatment.

### Follow-up
First missing positive ignores out-of-range values, places valid ones, then returns the first missing home or n+1.

### Practice ladder
Find All Numbers Disappeared in an Array (448) → First Missing Positive (41) → Find All Duplicates in an Array (442) → Missing Number (268)

## Quickselect & three-way partition

### Recognize it
Find a kth order statistic in an unsorted static array without sorting all values; mutation is permitted.

### Invariant
Partition into <pivot, =pivot, >pivot. The kth index lies in exactly one region; discard the others. A random pivot gives expected progress.

### Example
For [4,2,2,7], kth index 1 falls inside the equal-to-2 block, so return 2 immediately despite duplicate values.

### Template
```python
# schematic: partition3 rearranges a[lo:hi+1]
while lo <= hi:
    pivot = a[random_index(lo,hi)]
    first_equal,last_equal = partition3(a,lo,hi,pivot)
    if k < first_equal: hi = first_equal-1
    elif k > last_equal: lo = last_equal+1
    else: return a[k]
```

### Complexity
Expected O(n) time with random pivots; worst case O(n²). In-place iterative partition can use O(1) auxiliary memory.

### Common mistake
Do not call ordinary randomized quickselect worst-case linear. k is an index after rank conversion. A sorted output requires extra work.

### Follow-up
Compare a bounded heap for streaming data, or median-of-medians when a deterministic linear bound is essential.

### Practice ladder
Kth Largest Element in an Array (215) → K Closest Points to Origin (973) → Top K Frequent Elements (347)

## Reservoir sampling

### Recognize it
Uniform sampling from an unknown-length stream with bounded memory, when all items cannot be retained.

### Invariant
After i arrivals, each position has probability 1/i of being the selected item. Replacing with probability 1/i preserves this by induction.

### Example
For A,B,C: A survives with 1·1/2·2/3=1/3; B with 1/2·2/3=1/3; C is chosen with 1/3.

### Template
```python
chosen = None
for i,item in enumerate(stream,1):
    if randint(1,i) == 1:
        chosen = item
return chosen  # uniform inclusive integer RNG
```

### Complexity
O(n) time and O(1) extra memory for one sample, excluding item payload storage.

### Common mistake
Duplicates represent distinct positions. Distribution tests are sanity checks, not proofs. Modulo-reducing a random number can introduce bias.

### Follow-up
For k samples, fill k slots, then draw j uniformly in [1,i]; replace slot j−1 only if j≤k.

### Practice ladder
Linked List Random Node (382) → Random Pick Index (398) → Random Pick with Weight (528)

## Bit manipulation & parity invariants

### Recognize it
Compact subsets, parity, disjoint flags, repeated-value cancellation, and operations on fixed-width integer representations.

### Invariant
XOR is associative and self-canceling: x XOR x=0. For paired duplicates, XOR of the processed prefix retains exactly the uncanceled values.

### Example
[6,2,6] reduces to 2. For set-bit counting, 12 (1100) becomes 8 (1000), then 0 when repeatedly clearing the lowest set bit.

### Template
```python
def popcount_nonnegative(x):
    count = 0
    while x:
        x &= x-1
        count += 1
    return count
# For paired duplicates: reduce XOR over all values.
```

### Complexity
O(number of set bits) iterations for popcount; O(n) XOR operations for paired-duplicate cancellation. Bit-operation cost depends on integer width.

### Common mistake
Negative arbitrary-precision integers need a fixed-width mask for this popcount loop. XOR does not isolate a unique item under arbitrary multiplicities.

### Follow-up
For two unique values, split numbers by one set bit of their combined XOR and cancel pairs in each group.

### Practice ladder
Single Number (136) → Number of 1 Bits (191) → Counting Bits (338) → Single Number III (260) → Single Number II (137) → Bitwise AND of Numbers Range (201)
