# Interview mastery: preparation for demanding coding rounds

## 01 — The bar: modeling, proof, implementation, adaptation

**Prerequisites:** complete the foundation diagnostic and Phases 1–4. This is an original training track for demanding interviews, not an official Google course or a guarantee of selection.

Google’s published engineer advice emphasizes practicing explanations aloud and showing how you think. Its recruiting team’s public preparation material discusses data structures, algorithms, testing, edge cases, and complexity. The curriculum below translates those themes into practice; its timing, scoring, and problem choices are our recommendations, not Google’s hiring rubric.

**Primary references:** [Google engineer interview advice](https://blog.google/company-news/inside-google/life-at-google/google-engineer-shares-her-technical-interview-tips/), published March 2022; [Google recruiting team preparation post](https://www.linkedin.com/posts/google_how-to-prepare-for-technical-interviews-activity-7319057159177097217-lnuR), checked October 2026. Follow your recruiter’s current format instructions. DSA is only one component; senior roles may require separate design and leadership preparation.

### The six deliverables for every serious practice problem

1. **Contract:** inputs, outputs, constraints, permitted mutation, and tie behavior.
2. **Baseline:** a correct brute-force algorithm and its bottleneck.
3. **Model:** the state, invariant, or reduction that removes repeated work.
4. **Proof:** why the approach covers all cases and excludes invalid answers.
5. **Implementation:** coherent functions, meaningful variable names, and careful boundaries.
6. **Validation:** examples, adversarial tests, costs, and one changed-constraint follow-up.

Suppose you are asked to “find the best route.” Ask whether cost means hops, time, or maximum edge weight; whether edges are directed; and whether revisiting a vertex is allowed. These answers distinguish BFS, Dijkstra, minimax paths, or a state-expanded graph. Coding before resolving the objective can produce a perfect solution to the wrong problem.

### A useful practice timeline

In a 45-minute mock, spend roughly 5 minutes clarifying, 7 modeling, 20 implementing, 8 testing, and 5 on tradeoffs. Adjust when necessary. By minute 12, explain either a viable algorithm or the exact obstacle. Never silently spend the entire round searching for a clever trick. A correct baseline is useful evidence and a platform for improvement.

**Exercise:** take three solved questions and explain each in 90 seconds without code. Include the invariant, one rejected approach, and the cost. Then ask a partner to change an assumption. If you cannot explain what breaks, the solution is not yet transferable.

**Gate:** solve two unseen medium-scope tasks in separate sessions, with explicit proofs and one follow-up each. Use the readiness page to record evidence; completion counts alone do not pass the gate.

## 02 — Invariants, amortization, and lower bounds

**Prerequisites:** complexity, arrays, stacks, binary search. **Goal:** justify performance and correctness rather than reciting complexity labels.

### Loop invariants with a concrete example

To partition an array around value p, keep three regions: values less than p, unknown values, and values greater than p, with equal values handled explicitly. In Dutch-national-flag partitioning, maintain [0,lo) below p, [lo,i) equal to p, [i,hi] unknown, and (hi,n) above p. When swapping a large value at i with hi, decrease hi but do not increment i: the incoming value remains unclassified. Each step reduces the unknown region, which proves termination. The invariant at termination proves the partition.

### Amortized analysis

In a monotonic stack, a single iteration may pop many elements, but each index is pushed once and popped at most once. Charge every pop to the corresponding earlier push. Total stack operations are O(n). “Nested loop” is not a sufficient argument for quadratic time.

For a dynamic array that doubles when full, copying costs form 1+2+4+...+2^k < 2^(k+1). Across n appends, total copying is O(n), so each append is amortized O(1). This does not mean each append has constant latency. A follow-up demanding bounded latency may need chunked storage or incremental migration.

### Lower bounds and output-sensitive costs

Returning all n! permutations requires at least proportional time to the output. If each permutation contains n elements, materialization costs Ω(n·n!). Similarly, listing k matching pairs takes Ω(k), even if candidate lookup is constant time. Explain O(n+k), not simply O(n), when output volume varies.

Comparison sorting requires Ω(n log n) comparisons in the general model; counting/radix methods use additional assumptions about keys. Be precise about the computational model instead of treating a lower bound as universal.

**Practice ladder:** Sort Colors (75) → Daily Temperatures (739) → Largest Rectangle in Histogram (84) → Sliding Window Maximum (239).

**Follow-ups:** explain strict versus nonstrict comparisons for duplicate heights; support a stream with expiring elements; replace full output with only a count. **Gate:** present an invariant, termination argument, and accounting proof for a stack or deque solution without opening your notes.

**Reference:** [MIT 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/), algorithm analysis and data structures.

## 03 — Prefix sums, ordered prefixes, and monotonic deques

**Prerequisites:** hashing, sliding windows, binary search. **Goal:** know why a familiar window stops working and how to replace it.

For a target sum k, let prefix[0]=0 and prefix[j] be the sum of the first j values. A segment [i,j) has sum prefix[j]−prefix[i]. Equality queries become frequency-map lookups. For the longest segment with a given sum, store the earliest matching prefix index; for the shortest, the latest. A count requires multiplicity, not just one index.

### The hard variation: shortest segment with sum at least k

For signed inputs, ordinary shrinking fails because removing a negative number increases the sum. Maintain candidate prefix indices in increasing order of prefix value using a deque. At each j:

1. While prefix[j]−prefix[front] ≥ k, record j−front and remove front. Any later endpoint only makes a segment from that start longer, so this start has served its best purpose.
2. While prefix[back] ≥ prefix[j], remove back. The new index j is later and has a no-larger prefix: for any future endpoint it gives at least as much sum and a shorter segment. The old candidate is dominated.
3. Append j.

For [2,−1,2], k=3, prefixes are [0,2,1,3]. The prefix 2 is removed when prefix 1 arrives: the latter is a better future start. At prefix 3, start 0 qualifies, giving length 3. Every index enters and leaves once, so time is O(n), memory O(n).

### Count ranges instead of exact sums

If you need the number of prefixes in [current−upper,current−lower], a hash map is insufficient. Use ordered statistics, merge-sort counting, or coordinate compression with a Fenwick tree. Query previously inserted prefixes before inserting the current one. Compression preserves order, which is exactly what range-count queries need.

**Practice ladder:** Subarray Sum Equals K (560) → Minimum Size Subarray Sum (209) → Shortest Subarray with Sum at Least K (862) → Count of Range Sum (327).

**Follow-ups:** return endpoints; process online; count all qualifying intervals rather than the shortest; restrict maximum segment length. **Gate:** give a signed-array counterexample to an ordinary window, then prove both deque deletion rules.

**Reference:** [CP-Algorithms minimum queue](https://cp-algorithms.com/data_structures/stack_queue_modification.html).

## 04 — Binary search as a proof about a decision problem

**Prerequisites:** lower bound, sorting. **Goal:** derive bounds and feasibility, not just remember a template.

For minimum feasible x, establish false...false,true...true over a bounded integer domain. Keep the first true answer in [lo,hi]. If feasible(mid), set hi=mid; otherwise lo=mid+1. The interval strictly shrinks. If feasibility is not guaranteed anywhere, detect that before claiming a valid result.

### Minimize the largest segment sum

Given nonnegative numbers and at most k nonempty contiguous segments, ask whether maximum allowed sum C is feasible. Greedily extend the current segment until the next value would exceed C, then start another. Each greedy segment ends as far right as possible, so no other legal segmentation can cover more of the prefix with the same number of segments. This proves the greedy scan uses the minimum number of segments for C.

Lower bound is max(a); upper bound sum(a). For [7,2,5,10,8], k=2, C=18 yields [7,2,5] and [10,8], while C=17 requires three segments. Binary search returns 18. Time O(n log R), where R=sum(a)−max(a)+1.

If the question requires exactly k segments and k≤n, nonnegative values allow splitting an existing segment without increasing the maximum. With negative values, the greedy proof and convenient bounds can fail. Say so rather than applying the template unchanged.

### Binary search on real values

Use a fixed iteration count or an explicit precision rule. Ensure the error tolerance refers to the required output, not an arbitrary loop condition. Floating-point rounding can make a poorly designed loop stall. For discrete answers, avoid floating-point arithmetic when exact integer calculations suffice.

**Practice ladder:** Koko Eating Bananas (875) → Capacity To Ship Packages Within D Days (1011) → Split Array Largest Sum (410) → Find K-th Smallest Pair Distance (719) → Median of Two Sorted Arrays (4).

**Follow-ups:** reconstruct segments, count feasible partitions, answer many different k queries, introduce negative numbers. **Gate:** derive the predicate, its monotonicity, and the predicate’s correctness separately.

**Reference:** [CP-Algorithms binary search](https://cp-algorithms.com/num_methods/binary_search.html).

## 05 — Graph modeling: the vertex is sometimes more than a location

**Prerequisites:** BFS/DFS, heaps, graph representation. **Goal:** identify complete search states and safe pruning.

A grid cell is enough state only if reaching it makes all future possibilities identical. With one wall removal, the state is (row,column,removals_left). With keys, it may be (row,column,key_mask). Marking only the cell as visited can discard a longer arrival that has more resources and can eventually finish.

### Shortest path with a resource budget

For unit-cost moves, BFS explores states by distance. Start with (source,k). Moving into an obstacle consumes one unit. Reject states with negative remaining budget. Exact visited tracking uses O(RC(k+1)) memory and time up to O(RC(k+1)) on a four-neighbor grid.

Dominance can reduce work: if a cell was already reached at no greater distance with at least as much remaining budget, the new state cannot improve a future route. In ordinary layered BFS, earlier enqueues have no greater distance, so storing the best remaining budget seen per cell can be safe. In a differently ordered search, retaining only the largest budget is not enough: distance and budget must both be compared.

### Choose the frontier from edge costs

- Equal cost: BFS queue.
- Costs 0 or 1: 0–1 BFS deque; relax distances and push zero-cost edges to the front.
- Nonnegative arbitrary costs: Dijkstra with a min-heap and stale-entry handling.
- Negative edges: use a method such as Bellman–Ford when appropriate; inspect reachable negative cycles.
- DAG: process in topological order, even with negative edges.

For a path minimizing the maximum edge, relaxation becomes candidate=max(distance[u], weight(u,v)); take the smaller candidate at v. Dijkstra’s label-setting argument still works because extending a path cannot decrease this bottleneck value.

**Practice ladder:** Shortest Path in Binary Matrix (1091) → Shortest Path in a Grid with Obstacles Elimination (1293) → Minimum Cost to Make at Least One Valid Path in a Grid (1368) → Shortest Path to Get All Keys (864) → Path With Minimum Effort (1631).

**Follow-ups:** return the route; distinguish unreachable from zero distance; permit a one-time discounted edge; add a time window. **Gate:** construct an example where cell-only visited tracking fails and explain the correct state.

**References:** [0–1 BFS](https://cp-algorithms.com/graph/01_bfs.html), [Dijkstra](https://cp-algorithms.com/graph/dijkstra.html).

## 06 — Tree DP, rerooting, and ancestor queries

**Prerequisites:** postorder recursion, tree paths, DP basics. **Goal:** separate what a subtree returns from what a global answer needs.

For maximum path sum, a subtree returns its best downward chain. At node u, a complete path may use left gain + value[u] + right gain, but the value passed to the parent can use at most one child. Returning a fork to the parent creates an invalid path with three branches. Initialize the global answer to a real node value or negative infinity to handle all-negative trees.

### Rerooting: sum of distances from every vertex

Let size[v] be the number of vertices in v’s subtree under an initial root. First DFS computes sizes and the total distance from that root. When moving the root across edge u→v, size[v] nodes become one step closer and n−size[v] become one step farther:

**answer[v] = answer[u] − size[v] + (n − size[v]).**

For path 0—1—2, sizes from root 0 are [3,2,1], answer[0]=3. Then answer[1]=3−2+1=2 and answer[2]=2−1+2=3. Two traversals give O(n) time and O(n) storage. This assumes a connected tree, not a graph with alternate routes.

### Repeated ancestor queries

A single LCA query can use O(n) traversal. For many queries on a fixed tree, binary lifting stores up[v][j], the 2^j-th ancestor. Preprocess O(n log n), lift the deeper node, then lift both from large jumps downward until their parents agree. Each query is O(log n); memory O(n log n). Define the root’s ancestor convention to avoid invalid array access.

**Practice ladder:** Diameter of Binary Tree (543) → Binary Tree Maximum Path Sum (124) → House Robber III (337) → Sum of Distances in Tree (834) → Kth Ancestor of a Tree Node (1483).

**Follow-ups:** weighted edges change the reroot delta to weight·(n−2·size[v]); streaming structural updates invalidate static preprocessing; recursion depth may require iterative postorder. **Gate:** derive the reroot equation without memorization and explain the return state of a tree DP.

**Reference:** [LCA binary lifting](https://cp-algorithms.com/graph/lca_binary_lifting.html).

## 07 — Dynamic programming: complete states and reconstruction

**Prerequisites:** basic memoization, knapsack, sequence DP. **Goal:** turn a decision process into a recurrence and prove it.

Write the state in a full sentence. “dp[i] is the answer so far” is too vague. “dp[i] is the maximum value of a compatible subset among jobs ending no later than the i-th sorted job’s end” establishes what is included and what is excluded.

### Weighted interval scheduling

Sort jobs by finish time. For each job i, binary-search the number p of earlier jobs finishing at or before its start. Let dp[i+1] be the best value from the first i+1 jobs:

**dp[i+1] = max(dp[i], value[i] + dp[p]).**

Every optimal solution either excludes i, or includes i and can use only compatible earlier jobs. These cases are exhaustive; their subproblems are optimal by replacement. Sorting and predecessor searches cost O(n log n); DP costs O(n), memory O(n). Save take/skip decisions or compare table values while walking backward to reconstruct the selected jobs. Specify tie-breaking if multiple optima exist.

### Why extra state is sometimes necessary

In a trading problem, future legal actions depend on whether you hold a stock and on remaining transactions or cooldown. An index alone loses that information. In a path problem with at most k edges, dp[edges][vertex] avoids conflating states with different budgets. More dimensions are not automatically better: remove a dimension only after proving it is redundant.

### State compression and pseudopolynomial time

0/1 knapsack with numeric capacity W uses O(nW) time; W may be exponentially large relative to its binary representation. Call this pseudopolynomial. When compressing to one row, descending capacities prevent reusing the same item. When reconstructing selected items, careless one-row parent pointers can refer to overwritten states; retain a valid decision structure or recompute carefully.

**Practice ladder:** Partition Equal Subset Sum (416) → Target Sum (494) → Maximum Profit in Job Scheduling (1235) → Best Time to Buy and Sell Stock IV (188) → Minimum Cost to Cut a Stick (1547).

**Follow-ups:** return one optimal solution; count optimal solutions; require exactly k choices; allow negative values; replace a numeric capacity with a sparse set of reachable sums. **Gate:** define state/base/transition/order/output/cost before writing code for two unseen tasks.

**Reference:** [MIT 6.006 DP lectures](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/), [knapsack variants](https://cp-algorithms.com/dynamic_programming/knapsack.html).

## 08 — Sequence, interval, and bitmask DP

**Prerequisites:** Lesson 07, recursion, strings. **Goal:** recognize subproblem geometry.

### Two sequences

For LCS, dp[i][j] means the best common-subsequence length for prefixes a[:i], b[:j]. Equal final characters allow 1+dp[i−1][j−1]; otherwise take max(dp[i−1][j],dp[i][j−1]). Empty prefixes have length zero. There are O(nm) states and O(1) transition work. Rolling rows reduce memory to O(min(n,m)) if only the length is needed.

Edit distance adds substitution and counts the cheapest insert/delete/substitute operation. Do not copy the LCS recurrence unchanged. Explain exactly which prefix gets shorter for each operation.

### Interval DP: choose the last action

Burst Balloons becomes manageable when choosing the last balloon removed within an interval: its surviving boundary neighbors are then known. For boundaries l and r, try each internal k as the last removal and combine independent left/right subintervals plus boundary product. There are O(n²) intervals and O(n) choices, giving O(n³). Choosing the first removal leaves changing-neighbor context and is harder to express with a simple interval state.

### Bitmask DP

For visiting all vertices, state (mask,last) records both which vertices have been visited and where the walk ends. For unweighted graph walks, multi-source BFS from every singleton state finds the shortest route in the expanded graph. There are n·2^n states and roughly O(2^n E) transitions. This is viable only for small n. A mask alone cannot determine the cost of the next move because the endpoint matters.

**Practice ladder:** Longest Common Subsequence (1143) → Edit Distance (72) → Distinct Subsequences (115) → Burst Balloons (312) → Shortest Path Visiting All Nodes (847) → Smallest Sufficient Team (1125).

**Follow-ups:** reconstruct an alignment, return the lexicographically smallest optimum, count solutions modulo M, distinguish walks from simple paths. **Gate:** identify whether a new problem needs a prefix, interval, tree, or subset state and defend the choice.

**Reference:** [DP introduction](https://cp-algorithms.com/dynamic_programming/intro-to-dp.html), [submask enumeration](https://cp-algorithms.com/algebra/all-submasks.html).

## 09 — Greedy proofs, scheduling, and sweep lines

**Prerequisites:** sorting, heaps, intervals. **Goal:** know when a local choice is safe.

For maximum-cardinality nonoverlapping intervals, choose the earliest finishing interval. In any optimal solution, replace its first chosen interval with the earliest-finishing one. The replacement ends no later, so it cannot invalidate subsequent choices. Repeating gives a greedy optimum. If intervals have unequal values, earliest finish may fail; weighted interval DP is the appropriate extension.

### Minimum simultaneous resources

Represent each half-open booking [start,end) by a +1 event at start and −1 at end. Sort events; at equal time process endings before starts, or aggregate the net delta. The maximum prefix total equals peak overlap. For closed intervals, equal-time semantics differ. Ask before coding.

To assign specific room IDs, keep a min-heap by end time and reuse a room when its end≤next start. For multiple reusable rooms, release all that have ended before assigning, and use an additional free-ID heap if the smallest room ID is required. Peak size measures needed resources, while assignment introduces identity and tie rules.

### Scheduling with bounded choices

For selecting projects with capital constraints, sort by required capital and use a max-heap of affordable profits. This greedy approach relies on the stated model, such as nonnegative profits and no harmful side effects. Changed prerequisites or negative mandatory choices can destroy the argument.

**Practice ladder:** Non-overlapping Intervals (435) → Minimum Number of Arrows to Burst Balloons (452) → Meeting Rooms III (2402) → IPO (502) → The Skyline Problem (218).

**Follow-ups:** return assignments, process cancellations online, choose weighted intervals, handle equal starts deterministically. **Gate:** show a counterexample to an attractive wrong greedy rule and write a valid exchange argument for the correct one.

**Reference:** [CP-Algorithms scheduling](https://cp-algorithms.com/schedules/schedule-with-completion-duration.html); use the exact problem’s assumptions when choosing a scheduling theorem.

## 10 — Range queries, order statistics, and offline algorithms

**Prerequisites:** prefix sums, binary search, trees. **Goal:** select a structure from the operations, not from the topic’s reputation.

| Operations | Suitable starting point |
|---|---|
| Static sum queries | Prefix sum: O(n) setup, O(1) query |
| Point add + prefix/range sum | Fenwick tree: O(log n) update/query |
| Point update + associative range aggregate | Segment tree: O(log n) update/query |
| Static idempotent range min | Sparse table: O(n log n) setup, O(1) query |
| Order statistics over known value universe | Compressed frequency Fenwick tree |
| Offline connectivity as edges are added | Sort queries + DSU |

### Fenwick tree reasoning

With 1-based indices, tree[i] stores a suffix of the prefix ending at i with length lowbit(i). A prefix query repeatedly subtracts lowbit(i), partitioning the requested prefix into disjoint stored blocks. A point update repeatedly adds lowbit(i), reaching every block containing that position. Never update index zero: lowbit(0)=0 prevents progress.

To count smaller elements to the right, compress sorted unique values into ranks, scan from right to left, query count(rank−1), then add one at rank. Equal values share a rank and are excluded by rank−1. Time O(n log n), space O(n).

### Offline queries

If queries ask whether vertices connect using only edges with weight below limit L, sort edges and queries by threshold, union eligible edges, and answer connectivity. Maintain original query indices to restore order. Strictly below and at most require different edge-insertion comparisons. This works because edges only accumulate; arbitrary deletions require a different strategy.

**Practice ladder:** Range Sum Query - Mutable (307) → Count of Smaller Numbers After Self (315) → Reverse Pairs (493) → Checking Existence of Edge Length Limited Paths (1697) → Count of Range Sum (327).

**Follow-ups:** online unknown values, range updates, kth smallest query, deletion of edges. **Gate:** compare two viable structures and justify the simpler one for the required operations.

**References:** [Fenwick tree](https://cp-algorithms.com/data_structures/fenwick.html), [segment tree](https://cp-algorithms.com/data_structures/segment_tree.html), [DSU](https://cp-algorithms.com/data_structures/disjoint_set_union.html).

## 11 — Strings, tries, and exact matching

**Prerequisites:** strings, recursion, hashing. **Goal:** account for character work and avoid accidental quadratic behavior.

### KMP prefix function

pi[i] is the length of the longest proper prefix of s[:i+1] that is also a suffix. Start j=pi[i−1]. On mismatch, set j=pi[j−1] until the next character can extend the candidate border or j reaches zero. On match, increment j. For “ababa”, pi is [0,0,1,2,3]. Fallback reuses known borders rather than rescanning the whole prefix.

Across the scan, j increases at most O(n) times and every fallback decreases it, giving O(n) total work. To search a pattern, maintain the same matched-prefix length while scanning the text. After a full match, fall back to the proper border to allow overlapping matches. Handle the empty-pattern contract explicitly.

### Tries and wildcard search

A trie shares prefixes, making exact/prefix search O(L) for key length L under constant-time edge access. Memory depends on total stored characters and child representation. Wildcards branch; search is not automatically O(L). Sparse maps save empty edges; fixed arrays may improve constants for small alphabets.

Rolling hashes make substring comparisons fast but can collide. Exact verification restores certainty at potential extra cost. Do not describe a single unverified hash as deterministic equality. Unicode normalization and code-point versus byte indexing may affect what a “character” means.

**Practice ladder:** Find the Index of the First Occurrence in a String (28) → Implement Trie (208) → Design Add and Search Words Data Structure (211) → Word Search II (212) → Shortest Palindrome (214) → Longest Duplicate Substring (1044).

**Follow-ups:** streaming text, overlapping matches, many patterns, deleting words, top suggestions per prefix. **Gate:** trace KMP fallback on a repeated pattern and quantify trie wildcard branching.

**Reference:** [Prefix function / KMP](https://cp-algorithms.com/string/prefix-function.html), [string hashing](https://cp-algorithms.com/string/string-hashing.html).

## 12 — Data-structure design, randomization, and robust code

**Prerequisites:** maps, lists, heaps, complexity. **Goal:** preserve multiple invariants across every API operation.

### LRU cache

Use a map key→node and a doubly linked list ordered by recency. Every live key has exactly one live node; every live node is reachable from the map; head/tail sentinel links are consistent; size never exceeds capacity after a public operation. get moves a node to most-recent. put updates or inserts, then evicts the least-recent if necessary. All operations are expected O(1) under hash-map assumptions. Updating an existing key must not accidentally grow size.

### Randomized set and reservoir sampling

A dense array supports uniform random indexing. A map stores value→array index. To remove a value, move the last element into its slot, update the moved value’s index, pop, then remove the target mapping. This includes the special case where the target is already last.

For an unknown-length stream, keep the i-th item with probability 1/i as it arrives. An earlier item j remains selected through n with probability (1/j)·(j/(j+1))·...·((n−1)/n)=1/n. This proves uniformity for selecting one item in O(n) time and O(1) memory. For weighted sampling, plain reservoir logic is insufficient.

### Test the contract, not only examples

For a cache: repeated update, capacity one, missing key, get after eviction, alternating accesses. For randomized structures: verify membership and index consistency after every operation; distribution tests are statistical evidence, not a proof of uniformity. For parsers: nested inputs, malformed input if in scope, and large depth. For graph routines: empty graph when allowed, self-loops, parallel edges, disconnected components, and numeric overflow.

**Practice ladder:** LRU Cache (146) → Insert Delete GetRandom O(1) (380) → Random Pick with Weight (528) → Linked List Random Node (382) → LFU Cache (460).

**Follow-ups:** TTL expiration, stable eviction ties, thread safety, persistent storage. Explain that concurrency and distributed consistency are separate design concerns from the sequential coding problem. **Gate:** write API invariants first, then demonstrate that every operation preserves them.

**Reference:** [MIT 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/); official language collection/random APIs for implementation details.

## 13 — A deliberate 16-week training program

This track assumes basic programming fluency and roughly 12–16 focused hours/week. Extend the foundation stage if the diagnostic reveals gaps. The aim is depth and retention, not racing through every problem.

| Week | Focus | Deliverable |
|---|---|---|
| 1 | Diagnostic; complexity; invariants | Baseline mock, error log, two proofs |
| 2 | Hashing; prefix sums; arrays | Exact-sum variants and adversarial tests |
| 3 | Windows; monotonic stacks/deques | Explain signed-input failure and dominance |
| 4 | Binary search; sorting; intervals | Predicate proof and first gate |
| 5 | Lists; caches; API design | LRU implementation with invariant tests |
| 6 | Trees; BST; postorder summaries | Path-sum and reconstruction exercises |
| 7 | Rerooting; LCA; heaps | Two tree traversals and query tradeoffs |
| 8 | Graph modeling; BFS; topology | State-expanded graph lab and second gate |
| 9 | Weighted paths; DSU; MST | Compare BFS, 0–1 BFS, Dijkstra, DSU |
| 10 | DP state design; knapsack | Recurrence notebook and reconstruction |
| 11 | Sequence; interval; tree DP | Two unseen DP tasks with proofs |
| 12 | Greedy; scheduling; offline queries | Exchange proof and third gate |
| 13 | Strings; tries; range structures | Implement KMP and Fenwick from memory |
| 14 | Mixed problems; changed constraints | Four unseen base-plus-follow-up sessions |
| 15 | Timed interviews; targeted repair | Three mocks and two weakness sessions |
| 16 | Final mixed rehearsal; retention | Three fresh mocks, review, rest |

### Weekly rhythm

Days 1–2: concept study plus two focused problems each. Day 3: implement one algorithm from memory and compare against brute force on tiny inputs. Day 4: two mixed problems with hidden labels. Day 5: one 45-minute mock and a detailed debrief. Day 6: spaced re-solves and follow-ups. Day 7: rest or light retrieval. Reduce volume when a problem requires deeper work.

At weeks 4, 8, and 12, use two untouched questions and one original lab. If a gate fails, spend the next two sessions on its actual cause: incomplete state, missing proof, boundary bugs, or communication. Then retest with different questions. More of the same familiar questions does not establish readiness.

### Retention protocol

After an assisted solve, reimplement at day 1 without notes. At day 3, explain the invariant. At day 7, solve a variation. At day 14, mix the problem with other topics. At day 30, derive the approach from scratch. Record hints honestly. Seeing a solution twice should not count as solving two independent problems.

## 14 — Readiness evidence and interview recovery

Use the Readiness scorecard in the app after each unseen timed mock. Score 0–4 on understanding, algorithm selection, correctness reasoning, implementation/testing, and communication/adaptation. 0 means no useful evidence; 1 means substantial help; 2 means partial independence with major gaps; 3 means independent with small corrections; 4 means precise, independent, and robust under follow-up.

Our suggested readiness signal is three recent unseen mocks scoring at least 16/20 with no dimension below 3. Also require one retained re-solve, one graph/DP task, one proof-heavy task, and a changed-constraint follow-up. This is a training signal, not a Google hiring prediction. Self-scoring is more reliable when paired with another person’s observations.

### Recovering when stuck

1. Restate the model and one small example.
2. Write the correct baseline; identify the repeated work.
3. Ask whether information can be summarized, sorted, indexed, or reused.
4. Try a smaller subproblem, then state what extra information its answer needs.
5. Communicate your obstacle and respond constructively to hints.

If you discover a bug late, explain the violated invariant, repair that boundary or transition, and rerun the triggering case. Avoid rewriting a mostly correct solution without a diagnosis. If optimization is incomplete, clearly state the baseline’s true complexity and the next improvement you would attempt.

### Final checklist

- I can implement my language’s standard data-structure patterns without constant syntax lookup.
- I can distinguish complexity in n from complexity in the numeric value of an input.
- I can prove a greedy choice, binary-search predicate, and DP recurrence.
- I can model graph states that include budgets or collected resources.
- I can find a counterexample to an invalid shortcut.
- I can handle duplicates, extreme values, empty inputs where valid, and reconstruction.
- I have practiced in the actual interview environment described by my recruiter.
- My confidence comes from recent unseen performance, not a solved-count target.
