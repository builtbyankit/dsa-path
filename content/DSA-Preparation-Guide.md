# DSA Interview Preparation: From Foundations to Interview Readiness

Version 1 • 23 October 2026 • Language-independent curriculum

## What this guide covers

A structured preparation route for algorithm and data-structure interviews: the theory to understand, implementations to build, problems to solve, evidence to record, and milestones to pass. It follows the phase-based, learn-and-build approach of [AI Engineering from Scratch](https://github.com/rohitg00/ai-engineering-from-scratch), adapted into an original DSA curriculum.

No finite bank contains every question asked by every company. This guide covers transferable patterns, with an advanced extension for more algorithm-heavy interviews. Role, level, interviewer, and assessment format change expectations. System design, behavioral interviews, SQL, and domain knowledge require separate preparation.

The question bank supplies exact problem titles and LeetCode IDs. Open [LeetCode’s problem catalog](https://leetcode.com/problemset/) and search by ID or title. These are practice selections, not claims that a specific company currently asks them. Platform difficulty, access, and editorial availability can change. Full copyrighted problem statements and platform editorials are not reproduced here.

## Contents

1. Starting assessment and preparation routes
2. Learning loop and progress system
3. Complexity and correctness foundations
4. Phases 0–17: theory, practice, checkpoints
5. Pattern selection and worked reasoning examples
6. Implementation templates and language considerations
7. Mock interviews and scoring
8. Revision, troubleshooting, and final preparation
9. Resource map and reusable learning record

## 1. Starting assessment and preparation routes

### Diagnostic: do this before choosing a schedule

Allow 100 minutes: 10 minutes to explain complexity, 75 minutes for three questions, 15 minutes to review. Try Two Sum (1), Valid Parentheses (20), and Binary Tree Level Order Traversal (102). Do not use hints. State a brute-force approach, implement a solution, test it, and explain complexity. These are diagnostic tasks; do not count them as unseen mock problems later.

Score each question from 0 to 3: 0 = no viable approach; 1 = approach with major help; 2 = working code with small corrections; 3 = independently correct with explanation and tests. Add 0–3 for explaining O(n), O(n log n), and auxiliary space correctly.

| Score | Starting point | Immediate action |
|---|---|---|
| 0–3 | Programming foundations | Complete Phase 0, then repeat a different easy diagnostic |
| 4–6 | Beginner DSA | Start Phase 1 and use the full route |
| 7–9 | Some foundation | Attempt checkpoints in Phases 1–5; skip only demonstrated strengths |
| 10–12 | Comfortable basics | Sample later checkpoints; prioritize weak patterns and mixed practice |

This is a planning heuristic, not a standardized assessment or hiring predictor.

### Choose a route

**Full foundation route: 20 weeks, about 10–14 hours/week.** Weeks 1–2: Phases 0–2. Weeks 3–4: Phases 3–5. Weeks 5–6: Phases 6–7. Weeks 7–9: Phases 8–10. Weeks 10–12: Phases 11–12. Weeks 13–15: Phases 13–14. Weeks 16–17: Phase 15 and weak areas. Week 18: selected Phase 16 topics. Weeks 19–20: Phase 17 and mixed mocks. Extend this if programming itself is new.

**Standard route: 12 weeks, about 12–16 hours/week.** Week 1: assessment, foundations, arrays. Week 2: hashing and windows. Week 3: sorting, binary search, linked lists. Week 4: stacks and queues. Week 5: recursion and trees. Week 6: BSTs, heaps, tries. Week 7: graph traversal and topological ordering. Week 8: shortest paths, DSU, greedy. Weeks 9–10: DP. Week 11: bits, math, weak areas. Week 12: mocks. Use core questions first; extra questions are extensions, not a requirement to finish the schedule.

**Four-week revision route: existing DSA knowledge required.** Week 1: arrays, hashing, windows, binary search. Week 2: lists, stacks, trees, heaps. Week 3: graphs, greedy, DP. Week 4: mixed mocks and error review. Aim for 2–3 carefully reviewed problems/day, not a large completion count. This is not a substitute for learning all prerequisites.

**Seven-day emergency route.** Day 1: diagnostic and arrays/hashing. Day 2: windows and binary search. Day 3: stacks/lists. Day 4: trees/heaps. Day 5: BFS/DFS. Day 6: basic DP and one mock. Day 7: review past mistakes and rest. Restrict yourself to core problems already within reach; do not start advanced range structures.

## 2. Learning loop and progress system

### The daily 100-minute session

1. Retrieve yesterday’s invariant and complexity from memory (10 min).
2. Learn one concept and trace a tiny example (15 min).
3. Attempt one new problem independently (35 min).
4. If needed, take a small hint; implement, test, and compare approaches (20 min).
5. Record the mistake and schedule a re-solve (10 min).
6. Re-solve an older short problem or explain a solution aloud (10 min).

For hard questions, split work across sessions. After roughly 25–35 minutes without progress, write what blocks you and take a conceptual hint. Reading an answer is learning; it is not independent mastery. Reimplement from a blank file the next day.

### Mastery states

- **New:** not attempted.
- **Learning:** attempted, but needed an approach hint or solution.
- **Independent:** solved without approach help, with tests and complexity.
- **Retained:** independently re-solved after at least a week.
- **Transfer:** solved a related unseen variant and explained why the pattern applies.

Revisit at approximately day 1, day 3, day 7, day 14, and day 30. Shorten the interval after failure. Review the reasoning before opening previous code.

### Phase gate

Before moving on, implement the central structure/algorithm from memory; answer the theory checks; solve two unused questions from that phase independently; and explain one counterexample to an incorrect approach. A useful target is 30–40 minutes per medium-style task, but correctness and comprehension come first. If you cannot pass, spend two sessions repairing the specific gap and use new questions for the next gate.

Use core questions in listed order. Then choose extensions based on mistakes and available time. Keep some extensions untouched for assessment. The labels “core” and “extension” are learning priorities, not platform difficulty levels.

## 3. Complexity and correctness foundations

### Costs you should recognize

| Operation or approach | Typical time | Important condition |
|---|---|---|
| Array indexing | O(1) | Direct indexed access |
| Dynamic-array append | Amortized O(1) | A resize can individually cost O(n) |
| Array insertion/deletion in middle | O(n) | Elements may shift |
| Hash lookup/update | Expected O(1) | Worst case can be O(n); hashing/key comparison also costs time |
| Balanced search tree operations | O(log n) | Balance must be maintained |
| Heap peek / push / pop | O(1) / O(log n) / O(log n) | Heap construction from all items is O(n) |
| Comparison sorting | Typically O(n log n) | Space and worst-case bounds depend on algorithm |
| BFS/DFS adjacency list | O(V+E) | Includes visiting vertices and edges |
| Enumerating subsets | At least Ω(2^n) | Materializing each subset can add a factor n |
| Enumerating permutations | At least Ω(n!) | Copying each permutation costs O(n) |

Define each variable: n elements, m characters, V vertices, E edges, h height, k output size. Include recursive call-stack space. Separate auxiliary memory from output memory. Include string slicing, copying, sorting keys, and nested scans. Consecutive loops add; nested loops do not automatically multiply if pointers only advance a bounded total distance.

Constraint heuristics are rough filters, not runtime guarantees: n around 20 may allow subset enumeration; n around a few thousand may allow quadratic work; n around 100,000 usually suggests near-linear or n log n work. Time limits, constants, language, and memory decide feasibility.

### How to justify correctness

- **Loop invariant:** what remains true before and after each iteration?
- **Induction:** base case, hypothesis for smaller inputs, and composition.
- **Exchange argument:** replace part of an optimal answer with your greedy choice without making it worse.
- **State completeness:** does your DP state contain everything that can affect future decisions?
- **Monotonicity:** after a binary-search predicate becomes true, can it ever become false?

A useful explanation is: “This variable represents X. Each update preserves Y. When the loop ends, Y implies the requested answer.” Tests expose bugs; they do not prove correctness for all inputs.

## 4. The curriculum

### Phase 0 — Programming fluency and mathematical tools

**Prerequisite:** none. **Outcome:** write and test small programs without syntax friction.

Learn variables, branching, loops, functions, arrays, strings, maps, sets, references/mutation, basic classes, recursion syntax, and input parsing. Understand integer division, modulo, powers, logarithms, summations, factorials, and combinations. Learn your language’s collection APIs and sorting comparator conventions.

**Build:** frequency counter; reverse an array; compute GCD; implement a small test harness that compares actual and expected results.

**Core:** Fizz Buzz (412); Running Sum of 1d Array (1480); Richest Customer Wealth (1672); Number of Steps to Reduce a Number to Zero (1342).

**Extensions:** Palindrome Number (9); Plus One (66); Add Binary (67).

**Check:** distinguish a value from a reference; explain integer overflow; describe what happens when a loop receives an empty input.

**Reference:** your language’s official tutorial and collection documentation; MIT 6.006 assumes basic programming, so use it after this phase.

### Phase 1 — Analysis, recursion basics, and invariants

**Prerequisite:** Phase 0. Learn Big-O, Θ, Ω, worst-case versus expected versus amortized cost, recursion trees, and stack frames. Solve T(n)=T(n−1)+O(1), T(n)=T(n/2)+O(1), and T(n)=2T(n/2)+O(n). Their usual solutions are O(n), O(log n), and O(n log n).

**Build:** iterative and recursive factorial, linear search, recursive binary search. Trace stack growth and identify base cases. Explain why memoization changes repeated-state computation.

**Core:** Binary Search (704); Power of Two (231); Fibonacci Number (509).

**Extensions:** Pow(x, n) (50); Merge Sorted Array (88).

**Check:** why is building a result with repeated immutable string concatenation potentially quadratic? Why is a recursive traversal not O(1) space? Why can append be amortized constant time?

**Reference:** MIT 6.006 lecture notes on algorithms, data structures, and sorting.

### Phase 2 — Arrays, strings, hashing, and prefix sums

**Prerequisite:** Phase 1. Learn array traversal, in-place updates, frequency maps, sets, prefix and suffix aggregates, difference arrays, and multidimensional indexing. A prefix sum lets you answer range-sum queries by subtraction after linear preprocessing. For sums ending at index j, a previous prefix equal to current−target identifies a valid subarray.

**Invariants:** a frequency map describes exactly the processed prefix; initialize the zero prefix before scanning. For Two Sum, look for the complement before inserting the current element to avoid using it twice.

**Build:** prefix-sum range queries; difference-array range increments; anagram grouping. Explain key construction and its cost.

**Core:** Two Sum (1); Contains Duplicate (217); Valid Anagram (242); Group Anagrams (49); Product of Array Except Self (238); Subarray Sum Equals K (560); Range Sum Query - Immutable (303); Maximum Subarray (53).

**Extensions:** Longest Consecutive Sequence (128); Find All Numbers Disappeared in an Array (448); Set Matrix Zeroes (73); Rotate Image (48); Spiral Matrix (54); Find Pivot Index (724); Continuous Subarray Sum (523); Range Sum Query 2D - Immutable (304).

**Pitfalls:** duplicate values; negative values; overflow; confusing a subsequence with a contiguous subarray; repeatedly sorting strings inside a loop; using a set when multiplicities matter.

**Check:** why can prefix-sum hashing handle negatives while a standard sum window may fail? What additional memory does “in place” permit? What does a difference array defer?

**Reference:** MIT 6.006 hashing; CP-Algorithms search terms “prefix sums” and “Fenwick tree” for later connections.

### Phase 3 — Two pointers and sliding windows

**Prerequisite:** Phase 2. Learn opposing pointers, read/write pointers, fixed-size windows, variable-size windows, and last-seen indices. A valid moving-window algorithm requires a rule that tells you how expanding or shrinking affects validity. Nonnegative sums support monotone shrinking; arbitrary signed sums generally do not.

**Build:** remove duplicates in place; longest unique-character window; count subarrays with at most k distinct values. Derive exactly-k as at-most-k minus at-most-(k−1) when these counts are well-defined.

**Core:** Valid Palindrome (125); Two Sum II - Input Array Is Sorted (167); 3Sum (15); Container With Most Water (11); Move Zeroes (283); Longest Substring Without Repeating Characters (3); Minimum Size Subarray Sum (209); Permutation in String (567).

**Extensions:** Remove Duplicates from Sorted Array (26); Trapping Rain Water (42); Minimum Window Substring (76); Longest Repeating Character Replacement (424); Max Consecutive Ones III (1004); Fruit Into Baskets (904); Subarrays with K Different Integers (992).

**Pitfalls:** stale counts, off-by-one window length, forgetting to remove an outgoing item, emitting duplicate triplets, applying sorted-pointer logic without sorting or a proof.

**Check:** prove each pointer advances at most n times. Why move the shorter boundary in Container With Most Water? Give a negative-number counterexample to naive sum-window shrinking.

**Reference:** use problem discussions/editorials after attempting; analyze the invariant rather than memorizing the code.

### Phase 4 — Sorting, intervals, and binary search

**Prerequisite:** Phases 1–3. Learn stable versus unstable sorting, merge sort, quicksort partitioning, lower/upper bounds, interval endpoints, and binary search over an answer space. A predicate must be monotone. For a minimum feasible answer, preserve a range containing that answer and discard the impossible half.

**Build:** merge sort; lower_bound; upper_bound; merge overlapping intervals; a feasibility checker for a capacity problem.

**Core:** Search Insert Position (35); Find First and Last Position of Element in Sorted Array (34); Search in Rotated Sorted Array (33); Find Minimum in Rotated Sorted Array (153); Koko Eating Bananas (875); Merge Intervals (56); Insert Interval (57); Non-overlapping Intervals (435).

**Extensions:** Search a 2D Matrix (74); Find Peak Element (162); Capacity To Ship Packages Within D Days (1011); Split Array Largest Sum (410); Median of Two Sorted Arrays (4); Minimum Number of Arrows to Burst Balloons (452); Sort Colors (75).

**Pitfalls:** inclusive/exclusive boundary confusion, nonshrinking search ranges, overflow in midpoint or sum, treating touching intervals inconsistently, binary-searching a nonmonotone condition.

**Check:** prove why feasibility is monotone for shipping capacity; explain O(n log R), with R the numeric search range. State quicksort’s worst case and mergesort’s extra storage.

**Reference:** CP-Algorithms “Binary Search”; MIT 6.006 sorting.

### Phase 5 — Linked lists and pointer reasoning

**Prerequisite:** Phase 2. Learn singly and doubly linked lists, sentinel nodes, fast/slow pointers, identity versus value, and safe relinking. Save a successor before overwriting a next pointer. Use a dummy head when deleting or inserting at the front would otherwise require special cases.

**Build:** list reversal; delete a node by position; merge two lists; cycle detection. Draw pointers for a three-node example before coding.

**Core:** Reverse Linked List (206); Merge Two Sorted Lists (21); Linked List Cycle (141); Middle of the Linked List (876); Remove Nth Node From End of List (19); Reorder List (143).

**Extensions:** Linked List Cycle II (142); Intersection of Two Linked Lists (160); Add Two Numbers (2); Copy List with Random Pointer (138); Reverse Nodes in k-Group (25); Sort List (148); Palindrome Linked List (234).

**Pitfalls:** losing the tail, accidental cycles, comparing values instead of nodes, mutating an input without permission, failing to restore a list if the contract requires it.

**Check:** explain Floyd’s meeting and entry-point arguments. When is insertion O(1), and when does finding the insertion point cost O(n)?

**Reference:** MIT 6.006 data structures; use diagrams and manual traces for pointer changes.

### Phase 6 — Stacks, queues, monotonic structures

**Prerequisite:** Phases 2 and 5. Learn LIFO/FIFO behavior, expression evaluation, monotonic stacks, and monotonic deques. Store indices when distance, expiration, or duplicate identity matters. Although a pop loop is nested, each element may be pushed and popped once, giving linear total work.

**Build:** stack, circular queue, min-stack, next-greater-element scan, sliding-window maximum.

**Core:** Valid Parentheses (20); Min Stack (155); Implement Queue using Stacks (232); Evaluate Reverse Polish Notation (150); Daily Temperatures (739); Next Greater Element I (496).

**Extensions:** Next Greater Element II (503); Asteroid Collision (735); Decode String (394); Largest Rectangle in Histogram (84); Sliding Window Maximum (239); Remove K Digits (402); Online Stock Span (901).

**Pitfalls:** wrong strictness for equal elements, stale deque indices, using a front-removal operation that shifts an array, incorrect integer division for negative operands.

**Check:** distinguish a monotonic stack from a heap; prove amortized linear time; explain why window expiration must be tracked separately from value order.

**Reference:** CP-Algorithms “Minimum Stack / Minimum Queue.”

### Phase 7 — Recursion and backtracking

**Prerequisite:** Phases 1–3. Learn decision trees, choose/explore/undo, pruning, duplicate handling, and mutable-state restoration. Backtracking enumerates choices; DP can reuse equivalent states. Output size can dominate runtime.

**Build:** generate subsets and permutations, then handle duplicate inputs. State what the recursion parameters mean and which choices remain available.

**Core:** Subsets (78); Permutations (46); Combinations (77); Combination Sum (39); Generate Parentheses (22); Letter Combinations of a Phone Number (17).

**Extensions:** Subsets II (90); Permutations II (47); Combination Sum II (40); Word Search (79); Palindrome Partitioning (131); N-Queens (51); Sudoku Solver (37).

**Pitfalls:** storing a mutable path without copying it, failing to undo visited marks, pruning a valid branch, reusing an item illegally, permitting a zero/negative candidate in a recursion that assumes positive progress.

**Check:** why is subset output materialization O(n·2^n)? How do same-depth duplicate skips differ from forbidding a value everywhere?

**Reference:** use recursion-tree sketches; MIT algorithmic thinking and later DP lectures supply the state-based connection.

### Phase 8 — Binary trees and traversal

**Prerequisite:** Phases 5–7. Learn preorder/inorder/postorder, recursive and iterative DFS, BFS, subtree summaries, path state, and lowest common ancestors. A postorder function often returns a local summary while updating a global optimum. Height h can be n for a skewed tree.

**Build:** all three DFS orders, level order, height, and diameter. Define whether height counts edges or nodes before implementing.

**Core:** Maximum Depth of Binary Tree (104); Invert Binary Tree (226); Same Tree (100); Binary Tree Level Order Traversal (102); Diameter of Binary Tree (543); Balanced Binary Tree (110); Lowest Common Ancestor of a Binary Tree (236); Path Sum (112).

**Extensions:** Binary Tree Right Side View (199); Subtree of Another Tree (572); Construct Binary Tree from Preorder and Inorder Traversal (105); Serialize and Deserialize Binary Tree (297); Binary Tree Maximum Path Sum (124); Path Sum III (437); Count Good Nodes in Binary Tree (1448).

**Pitfalls:** recomputing subtree height at every node, confusing a root-to-leaf path with any path, returning a forked path to a parent, failing on all-negative values, assuming balanced-tree memory bounds.

**Check:** explain why diameter can be computed in O(n). Why can BFS consume O(n) memory? What data must serialization retain to distinguish missing children?

**Reference:** MIT 6.006 binary trees; CP-Algorithms LCA topics for extensions.

### Phase 9 — BSTs, heaps, and selection

**Prerequisite:** Phase 8. Learn BST ordering with ancestor bounds, inorder ordering, balanced versus unbalanced search trees, heap invariants, streaming top-k, two-heap medians, and k-way merging. A heap exposes one extreme; it does not keep all elements sorted.

**Build:** BST search/insert/delete conceptually; binary heap push/pop; maintain the k largest stream elements in a size-k min-heap.

**Core:** Validate Binary Search Tree (98); Kth Smallest Element in a BST (230); Lowest Common Ancestor of a Binary Search Tree (235); Kth Largest Element in an Array (215); Top K Frequent Elements (347); K Closest Points to Origin (973); Last Stone Weight (1046).

**Extensions:** Binary Search Tree Iterator (173); Delete Node in a BST (450); Merge k Sorted Lists (23); Find Median from Data Stream (295); Find K Pairs with Smallest Sums (373); Task Scheduler (621).

**Pitfalls:** checking only parent-child comparisons in a BST, wrong heap direction, comparators that overflow, assuming quickselect is worst-case linear without a suitable pivot strategy.

**Check:** derive O(n log k) top-k time; compare sorting and quickselect; explain why inorder rank search can be O(n) without augmentation.

**Reference:** MIT 6.006 heaps and binary search trees.

### Phase 10 — Tries and data-structure design

**Prerequisite:** hashing, linked lists, heaps, trees. Learn prefix nodes, terminal markers, alphabet/storage tradeoffs, and composition of structures. Design begins with the API and required operation costs. A hash map plus doubly linked list supports expected constant-time LRU access/update.

**Build:** trie insert/search/prefix; LRU cache; randomized set with array-plus-index-map and swap-with-last removal.

**Core:** Implement Trie (Prefix Tree) (208); Design Add and Search Words Data Structure (211); LRU Cache (146); Insert Delete GetRandom O(1) (380); Time Based Key-Value Store (981).

**Extensions:** Word Search II (212); Design Twitter (355); LFU Cache (460); Design HashMap (706); Design HashSet (705).

**Pitfalls:** confusing a prefix with a word, failing to update the moved item’s index, forgetting cache updates change recency, ambiguous timestamp ordering assumptions.

**Check:** which costs are expected versus worst-case? Why may wildcard trie search branch exponentially in pattern length? What should happen with capacity one or repeated updates?

**Reference:** CP-Algorithms string topics; use explicit operation traces for design exercises.

### Phase 11 — Graph representation, BFS, DFS, topology

**Prerequisite:** queues, recursion, hashing. Learn adjacency lists/matrices, directed/undirected graphs, connected components, grid-as-graph modeling, cycle detection, bipartiteness, topological sorting, and multi-source BFS. Mark vertices when enqueueing to avoid repeated queue entries.

**Build:** BFS/DFS across disconnected graphs; Kahn’s topological sort; directed cycle detection with three states; multi-source grid distance.

**Core:** Number of Islands (200); Flood Fill (733); Clone Graph (133); Rotting Oranges (994); Course Schedule (207); Course Schedule II (210); Is Graph Bipartite? (785); Pacific Atlantic Water Flow (417).

**Extensions:** Surrounded Regions (130); Number of Provinces (547); Word Ladder (127); Shortest Path in Binary Matrix (1091); 01 Matrix (542); Find Eventual Safe States (802); Evaluate Division (399).

**Pitfalls:** missing isolated vertices, mutating a grid unexpectedly, confusing directed and undirected cycle rules, reusing DFS visited state incorrectly, copying a node without preserving shared graph identity.

**Check:** why does BFS give shortest paths for unit-cost edges? How do you detect a cycle with Kahn’s algorithm? Why is reverse reachability useful for water-flow problems?

**Reference:** CP-Algorithms “Breadth First Search,” “Depth First Search,” and “Topological Sorting”; MIT graph lectures.

### Phase 12 — Weighted graphs, DSU, and spanning trees

**Prerequisite:** Phase 11 and heaps. Learn Dijkstra for nonnegative weights; Bellman–Ford for negative edges and reachable negative-cycle detection; Floyd–Warshall for all pairs on small graphs; DSU with path compression and union by rank/size; Kruskal and Prim for minimum spanning trees.

Binary-heap Dijkstra is commonly O((V+E) log V) with adjacency lists under standard simple-graph assumptions; lazy duplicate entries require stale-entry checks. Bellman–Ford is O(VE); Floyd–Warshall O(V³) time/O(V²) memory. DSU has amortized O(α(V)) operations with the standard optimizations. Kruskal usually costs O(E log E).

**Build:** DSU; Kruskal; Dijkstra that also reconstructs a path. Distinguish a minimum spanning tree from a shortest-path tree.

**Core:** Network Delay Time (743); Redundant Connection (684); Min Cost to Connect All Points (1584); Accounts Merge (721); Path With Minimum Effort (1631).

**Extensions:** Cheapest Flights Within K Stops (787); Swim in Rising Water (778); Number of Operations to Make Network Connected (1319); Find the City With the Smallest Number of Neighbors at a Threshold Distance (1334); Critical Connections in a Network (1192).

**Pitfalls:** using ordinary Dijkstra with negative weights, forgetting the stop count belongs in the flight state, confusing DSU parent pointers with graph edges, taking a disconnected forest as a spanning tree.

**Check:** give a negative-edge failure example for greedy shortest-path finalization. Explain the MST cut property. What extra state is needed when the number of edges is constrained?

**Reference:** CP-Algorithms “Dijkstra,” “Bellman-Ford,” “Disjoint Set Union,” “Minimum Spanning Tree,” and bridges.

### Phase 13 — Greedy algorithms

**Prerequisite:** sorting, heaps, graph basics. Learn feasibility-preserving local choices, exchange arguments, interval scheduling, resource allocation, and sweep-line events. A promising choice is not enough; explain why some optimal solution can include it.

**Build:** maximize nonoverlapping intervals by earliest finish time; annotate the exchange proof. Compare against the incorrect shortest-duration and earliest-start heuristics.

**Core:** Best Time to Buy and Sell Stock (121); Jump Game (55); Jump Game II (45); Gas Station (134); Partition Labels (763); Assign Cookies (455).

**Extensions:** Candy (135); Hand of Straights (846); Queue Reconstruction by Height (406); Boats to Save People (881); Maximum Subarray (53, revisit with a greedy/DP interpretation).

**Pitfalls:** using greedy coin selection for arbitrary denominations, sorting away meaningful order, picking a rule solely because it fits one example, ignoring equal-time event ordering.

**Check:** show why coin denominations 1, 3, 4 defeat largest-coin-first for amount 6. Explain the farthest-reachable invariant in Jump Game.

**Reference:** MIT algorithms materials; CP-Algorithms scheduling articles for extension work.

### Phase 14 — Dynamic programming, from state design to optimization

**Prerequisite:** recursion, arrays, graph DAG reasoning. DP solves repeated subproblems whose state captures all future-relevant information. Begin with a correct recurrence; caching cannot repair an incomplete state.

For every problem write: state meaning, choices, recurrence, base cases, evaluation order, answer location, number of states, transition cost, and reconstruction needs. Time is states × work per state, with care for variable-cost transitions. Optimize space only after the dependencies are clear.

**Lesson order:** (1) linear take/skip; (2) grid paths; (3) 0/1 and unbounded knapsack; (4) subsequences and strings; (5) interval DP; (6) tree/DAG DP; (7) optional bitmask DP.

**Build:** recursive, memoized, tabulated, and rolling-memory versions of House Robber. For 0/1 knapsack, process capacities downward so an item is used once; for standard unbounded accumulation, upward iteration permits reuse. For counting, loop order can distinguish combinations from ordered sequences.

**Core, linear:** Climbing Stairs (70); Min Cost Climbing Stairs (746); House Robber (198); House Robber II (213); Decode Ways (91).

**Core, grids/knapsack:** Unique Paths (62); Minimum Path Sum (64); Coin Change (322); Coin Change II (518); Partition Equal Subset Sum (416); Target Sum (494).

**Core, sequence/string:** Longest Increasing Subsequence (300); Longest Common Subsequence (1143); Word Break (139); Edit Distance (72); Longest Palindromic Substring (5).

**Extensions:** Unique Paths II (63); Triangle (120); Maximum Product Subarray (152); Longest Palindromic Subsequence (516); Distinct Subsequences (115); Interleaving String (97); Best Time to Buy and Sell Stock with Cooldown (309); Best Time to Buy and Sell Stock with Transaction Fee (714); Burst Balloons (312); Palindromic Substrings (647); House Robber III (337); Partition Array for Maximum Sum (1043); Regular Expression Matching (10).

**Pitfalls:** using zero for both unreachable and valid states, treating numeric-amount DP as polynomial in input bit length, mixing “at most” with “exactly,” incorrect loop direction, resetting memo state between calls, compressing away information needed for reconstruction.

**Check:** derive Coin Change instead of recalling it. Explain why dp[i] alone is insufficient for some trading problems. Why does LIS admit both O(n²) DP and an O(n log n) method? Why does the latter’s tails array not directly provide the subsequence?

**Reference:** MIT 6.006 DP lectures; CP-Algorithms “Introduction to Dynamic Programming,” “Knapsack Problem,” and “Longest increasing subsequence.”

### Phase 15 — Bit manipulation and interview mathematics

**Prerequisite:** Phase 1. Learn AND/OR/XOR, shifts, bit masks, set-bit counting, parity, XOR cancellation, GCD, sieve, fast exponentiation, modular arithmetic, and simple combinatorics. Understand signed width and overflow in your language. Floating-point equality is often unsafe.

**Build:** GCD; sieve; binary exponentiation; enumerate subsets with masks; test and clear the lowest set bit. For x>0, x & (x−1) clears its lowest set bit.

**Core:** Single Number (136); Number of 1 Bits (191); Counting Bits (338); Missing Number (268); Reverse Bits (190); Happy Number (202).

**Extensions:** Single Number II (137); Single Number III (260); Bitwise AND of Numbers Range (201); Sum of Two Integers (371); Count Primes (204); Factorial Trailing Zeroes (172); Excel Sheet Column Number (171); Pow(x, n) (50, revisit).

**Pitfalls:** assuming division works modulo any modulus, negative-number shifts, nonfixed integer widths, overflow before taking modulo, using floating-point powers for exact integer decisions.

**Check:** why does XOR isolate an element only under the relevant multiplicity assumptions? When does a modular inverse exist? What is the difference between arithmetic cost on fixed-width integers and very large integers?

**Reference:** CP-Algorithms bit manipulation, Euclidean algorithm, binary exponentiation, sieve, and modular inverse.

### Phase 16 — Advanced extension: choose selectively

**Prerequisite:** all relevant core phases. This is optional breadth for roles or assessments where evidence suggests deeper algorithm coverage. Do not let it displace basic fluency.

| Topic | Required theory/build | Practice |
|---|---|---|
| Fenwick tree | Prefix aggregates, point updates, lowbit; O(log n) operations | Range Sum Query - Mutable (307); Count of Smaller Numbers After Self (315) |
| Segment tree | Associative merge, range queries, point updates; lazy propagation for compatible range updates | 307; My Calendar I (729); Falling Squares (699) |
| String matching | Prefix function/KMP, Z function, rolling-hash collisions | Find the Index of the First Occurrence in a String (28); Repeated String Match (686); Shortest Palindrome (214) |
| Strong connectivity/bridges | DFS entry/low-link times; component condensation | Critical Connections in a Network (1192); build SCC decomposition on your own fixtures |
| Bitmask DP | State = visited set plus endpoint; exponential state count | Shortest Path Visiting All Nodes (847); Smallest Sufficient Team (1125) |
| Meet in the middle | Enumerate two halves and combine | Closest Subsequence Sum (1755) |
| Sweep line/ordered events | Active set, event ties, coordinate compression | The Skyline Problem (218) |
| Euler paths | Degree constraints and Hierholzer traversal | Reconstruct Itinerary (332) |
| Geometry | Cross product, orientation, exact arithmetic | Max Points on a Line (149); Erect the Fence (587) |
| Flow/matching | Residual graph, augmenting paths, bipartite matching | Implement a small matching solver and verify against brute force |

Some listed questions have simpler alternative solutions; use the target structure as a deliberate exercise, then compare tradeoffs. Coordinate compression preserves order, not original numeric distance. Segment trees require an appropriate merge operation; prefix subtraction is not available for every aggregate.

**Gate:** explain which operations force the advanced structure and why a simpler structure is insufficient. Use CP-Algorithms’ matching topic article and a tiny brute-force oracle to validate your implementation.

### Phase 17 — Mixed interviews and adaptation

Hide topic labels. Practice turning a verbal specification into a precise model. Clarify duplicates, ordering, mutation, empty inputs, numeric range, and expected output. Handle follow-ups: streaming input, limited memory, many queries, online updates, reconstruction, or changed edge weights.

Reserve unseen questions: Find All Anagrams in a String (438); Car Fleet (853); Maximum Width of Binary Tree (662); Shortest Bridge (934); Delete and Earn (740); Successful Pairs of Spells and Potions (2300); Reorganize String (767); Minimum Genetic Mutation (433).

After each problem, change one assumption and decide whether the algorithm still works. Example: changing positive numbers to arbitrary integers can invalidate a sliding window; adding edge weights can invalidate plain BFS shortest paths.

## 5. Pattern selection and worked reasoning

### A decision map, not a keyword dictionary

| Evidence in the problem | Candidate approach | Verify before choosing |
|---|---|---|
| Fast membership or frequency queries | Set/map | Are duplicates significant? What is key cost? |
| Contiguous segment with maintained validity | Window | Does moving a boundary permit predictable repair? |
| Count arbitrary signed sum segments | Prefix sum + frequency map | Do we need counts, first index, or latest index? |
| Sorted search or monotone feasibility | Binary search | Can you prove the predicate is monotone? |
| Next greater/smaller boundary | Monotonic stack | How should equal values behave? |
| Top-k or repeatedly take extreme | Heap | Can a size-k heap limit memory? |
| Minimum unit-edge steps | BFS | Are all transition costs equal? |
| Nonnegative weighted shortest path | Dijkstra | Does the state include all constraints? |
| Prerequisites/dependencies | DAG/topological sort | Can cycles exist and what do they mean? |
| Connectivity under added edges | DSU | Are deletions required? Basic DSU does not handle them directly |
| Enumerate all configurations | Backtracking | How large is the output? |
| Repeated decision states | DP | Is the state complete and recurrence acyclic? |
| Local optimal choice | Greedy | Can an exchange/cut argument prove it? |

### Worked example A: count subarrays summing to k

Let p[j] be the sum before position j, with p[0]=0. The sum from i through j−1 is p[j]−p[i]. Therefore each earlier prefix p[i]=p[j]−k contributes a valid subarray. Keep counts, not just membership.

For [1, −1, 1], k=1: start counts={0:1}, sum=0, answer=0. Read 1: sum=1; counts[0]=1 adds one; insert 1. Read −1: sum=0; counts[−1]=0 adds none; increment count of 0 to two. Read 1: sum=1; counts[0]=2 adds two. Answer=3. Query before inserting to avoid counting a zero-length interval when k=0. Expected O(n) time and O(n) extra space under standard hashing assumptions.

### Worked example B: binary search on capacity

For positive package weights that must remain in order, capacity C is feasible if a greedy scan can pack them in at most D days. A larger capacity cannot require more days: it can reproduce the smaller-capacity packing. Search between max(weight) and sum(weight). At each midpoint, a scan decides feasibility. If feasible, retain the lower half including midpoint; otherwise discard midpoint and everything smaller. Time O(n log(sum−max+1)), extra space O(1). The proof depends on the ordering and positive-weight constraints.

### Worked example C: derive House Robber

Define dp[i] as the largest sum obtainable from the first i houses with no adjacent selections. For nonnegative values, dp[0]=0 and dp[1]=a[0]. At the last house, either skip it and obtain dp[i−1], or take it and combine a[i−1] with dp[i−2]. Thus dp[i]=max(dp[i−1], dp[i−2]+a[i−1]). These cases exhaust all legal solutions and each subproblem has the same structure. O(n) time; O(n) table or O(1) rolling state. Keep additional information if the output must identify chosen houses.

## 6. Implementation templates and language considerations

These Python examples illustrate invariants. Use your strongest supported interview language; do not switch shortly before an interview solely for shorter syntax.

### Lower bound: first index with value at least target

```python
def lower_bound(a, target):
    lo, hi = 0, len(a)  # answer is in [lo, hi]
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo  # len(a) means no qualifying element
```

### BFS distances on a graph represented by adjacency lists

```python
from collections import deque

def distances(adj, source):
    dist = {source: 0}
    q = deque([source])
    while q:
        u = q.popleft()
        for v in adj.get(u, []):
            if v not in dist:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist  # unreachable vertices are absent
```

### Backtracking with explicit restoration

```python
def subsets(a):
    result, path = [], []
    def visit(i):
        if i == len(a):
            result.append(path.copy())
            return
        visit(i + 1)
        path.append(a[i])
        visit(i + 1)
        path.pop()
    visit(0)
    return result  # duplicate input values can yield duplicate subsets
```

### Dijkstra with stale-entry handling

```python
from heapq import heappush, heappop

def dijkstra(adj, source):
    # vertices are integer IDs; edges (neighbor, weight) have weight >= 0
    dist = {source: 0}
    heap = [(0, source)]
    while heap:
        d, u = heappop(heap)
        if d != dist[u]:
            continue
        for v, w in adj.get(u, []):
            candidate = d + w
            if candidate < dist.get(v, float('inf')):
                dist[v] = candidate
                heappush(heap, (candidate, v))
    return dist
```

### Language checklist

- **Python:** know deque, heapq, bisect, Counter/defaultdict, tuple keys, sort keys, and mutable aliasing. list.pop(0) and slices can cost O(n). Deep recursion can exceed the interpreter limit; prefer iterative traversal for very deep inputs.
- **Java:** know ArrayDeque, HashMap, HashSet, PriorityQueue, arrays, and StringBuilder. Use long for potentially large totals. Use comparator methods rather than subtracting values that may overflow.
- **C++:** know vector, unordered_map, map, set, priority_queue, deque, lower_bound, and sort. Understand iterator invalidation, pass-by-reference, and signed overflow. Use an adequately wide integer type for sums/products.
- **JavaScript/TypeScript:** know Map/Set, numeric sort comparators, queue head indices, and how to implement a heap. Understand Number’s exact integer range and the signed 32-bit behavior of common bitwise operators.

### Testing checklist

Try empty input when valid, one element, all equal values, duplicates, sorted/reversed input, zero/negative values, extreme magnitude, answer absent, answer at either boundary, skewed trees, disconnected graphs, and cycles. Choose applicable tests rather than blindly applying every case. For complex algorithms, compare random tiny cases against brute force, then test large cases for performance.

## 7. Mock interviews and scoring

### A 45-minute round

Minutes 0–5: clarify and trace an example. Minutes 5–12: explain brute force, find the bottleneck, propose an improved approach. Minutes 12–30: implement while explaining important choices. Minutes 30–38: test and debug. Minutes 38–45: justify complexity and handle a follow-up. This is a practice allocation, not a rule about every employer’s interview format.

If stuck, expose useful reasoning: “The repeated scan is the bottleneck; I’m looking for a summary that lets us update it incrementally.” Ask a precise question about the ambiguous requirement rather than silently guessing.

### Mock sets

Use 60–75 minutes for each two-question set. If already solved, substitute untouched questions of comparable scope; known questions measure retention, not unseen performance.

1. Product of Array Except Self (238) + Valid Parentheses (20).
2. Longest Substring Without Repeating Characters (3) + Search in Rotated Sorted Array (33).
3. Reorder List (143) + Binary Tree Right Side View (199).
4. Top K Frequent Elements (347) + Course Schedule (207).
5. Rotting Oranges (994) + Coin Change (322).
6. LRU Cache (146) + explain a cache-capacity follow-up rather than adding a second full problem.
7. Network Delay Time (743) + Partition Equal Subset Sum (416).
8. One randomly chosen untouched Phase 17 problem with changing constraints.

### Rubric: 0–4 in five categories

| Category | Strong evidence |
|---|---|
| Understanding | Clear inputs/outputs, constraints, edge cases, and example |
| Reasoning | Viable approach, invariant/proof, recognizes assumptions |
| Implementation | Correct, readable code with controlled state |
| Validation | Useful tests, identifies and repairs bugs systematically |
| Communication | Explains tradeoffs, complexity, and follow-up changes |

For each category: 0 = absent; 1 = major help needed; 2 = partially independent with significant gaps; 3 = independent with small corrections; 4 = independent, precise, and adaptable. A proposed readiness signal is at least 16/20 on three recent mixed mocks, with no category below 2. This is a self-assessment threshold, not an employer’s hiring bar.

For online assessments, also practice reading all tasks before allocating time, custom-input testing, function signatures, input/output formats, and working within the exact allowed environment. For live interviews, practice explaining without narrating every keystroke.

## 8. Revision, troubleshooting, and final preparation

### Fix the failure, not just the question

| Symptom | Likely gap | Repair exercise |
|---|---|---|
| Can follow solutions but cannot begin | Pattern recognition/state modeling | Write brute force and its repeated work for five problems |
| Chooses the right algorithm but code fails | Invariants/boundaries | Trace tiny inputs and write state meanings before coding |
| Solves only labeled sets | Overfitting to topic labels | Use shuffled, unseen questions |
| DP feels like guessing | Incomplete states/recurrence | Write recursive decisions and identify repeated states first |
| Graph traversal loops or duplicates | Visited timing/state definition | Trace enqueue/visit events on a cycle and diamond graph |
| Works on examples but times out | Complexity/copying cost | Count total operations and include library calls |
| Forgets after a week | Insufficient retrieval | Re-solve from blank files on spaced intervals |
| Fails under time pressure | Practice format differs from interview | Use timed mocks with spoken explanation |

### Weekly review

Record independent solve rate, hint rate, retained re-solves, time to a viable approach, and repeated bug categories. Reallocate the next week toward the two weakest patterns. Do not use total problem count as the sole measure of progress.

### Adapting for a target employer

Use the recruiter’s current instructions and the role description to learn the language choices, platform, round length, assessment style, and whether library use is allowed. Add a small targeted practice layer after the core curriculum. Treat company tags and anecdotal reports as noisy supplementary evidence; do not replace broad preparation with memorization or claim a question is guaranteed.

### Final 48 hours

Review your mistake log, core templates, and language pitfalls. Do one moderate mock early enough to review it. Confirm interview setup, allowed tools, and the problem-solving environment. Avoid using the last evening to learn an entire advanced topic. During the round, make assumptions explicit, preserve a working solution when possible, and test before optimizing further.

## 9. Resource map and reusable learning record

The following resource landing pages were checked while preparing this guide. The curriculum sequence, practice priorities, schedules, and readiness rubric are this guide’s recommendations. Individual problem links/access and every linked subpage were not independently audited.

| Resource | How to use it |
|---|---|
| [MIT 6.006, Spring 2020](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) | Primary theory course. Use lecture notes/videos and assignments for analysis, sorting, hashing, trees, heaps, graphs, and DP. Select the matching lecture; watching the entire course before practicing is unnecessary. |
| [CP-Algorithms](https://cp-algorithms.com/) | Topic-level reference for algorithm explanations, correctness arguments, complexity, and implementations. Use the exact article names in each phase; advanced sections are optional. |
| [LeetCode Top Interview 150](https://leetcode.com/studyplan/top-interview-150/) | An additional organized practice route. The publisher describes it as a 150-question plan suited to 3+ months; it is not a guarantee of company coverage. |
| [LeetCode problem catalog](https://leetcode.com/problemset/) | Find this guide’s questions by exact ID/title. Attempt before viewing solutions; access conditions may vary. |
| [AI Engineering from Scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Structural inspiration: progress through phases with practical evidence. The DSA content here is a separate curriculum, not an official extension of that repository. |

### Theory questions to answer aloud before interviews

1. What differs between expected, amortized, and worst-case complexity?
2. Why can a hash table degrade, and what costs do long keys add?
3. Why can a nested while loop still be linear?
4. What does recursion add to memory usage?
5. When does sorting destroy information the problem needs?
6. What makes a sliding window valid?
7. What predicate permits binary search over an answer?
8. Why are monotonic stacks linear in aggregate?
9. How does a heap differ from a sorted array or balanced BST?
10. What is the cost of operations in a skewed BST?
11. Why does BFS find shortest unweighted paths?
12. How does directed cycle detection differ from undirected cycle detection?
13. When can a topological ordering exist?
14. What assumption does Dijkstra require?
15. How do MSTs differ from shortest-path trees?
16. What can basic DSU answer efficiently, and what can it not?
17. What establishes the correctness of a greedy choice?
18. What must a DP state capture?
19. How do you derive DP runtime from states and transitions?
20. Why does 0/1 knapsack use descending capacity updates?
21. When does changing loop order change a counting problem?
22. What information is lost when DP memory is compressed?
23. Why is numeric-sum DP called pseudopolynomial?
24. How does output size limit enumeration algorithms?
25. How would streaming input or online updates change your solution?

Answers should include a small example or counterexample. Consult the matching phase when an answer is vague.

### Copy this learning record

```text
Current phase:
Chosen route and weekly hours:
Language:
Target date / known assessment format:

Problem ID and title:
Date / time spent:
Status: New / Learning / Independent / Retained / Transfer
Approach hints used:
Brute-force approach and bottleneck:
Final state/invariant:
Why the approach is correct:
Time / auxiliary space / output space:
Edge cases tested:
Bug or misconception:
Changed-constraint follow-up:
Next review dates:

Weekly independent solve rate:
Weekly retained re-solves:
Two weak patterns:
Next week's repair exercises:
Latest mock score and evidence:
```

### Optional tutoring prompt

“Use the attached DSA Preparation Guide and my learning record. Teach the next incomplete phase one concept at a time. Ask me to predict behavior, explain an invariant, and implement a small exercise. Give progressively stronger hints only when needed. Do not show the full solution before I attempt it. Finish with an unseen transfer question and an updated learning record. Do not mark mastery merely because I read a solution.”

### Start now

Complete the diagnostic, choose a realistic weekly budget, create your learning record, and begin the first phase whose checkpoint you cannot yet pass. Your goal is to recognize the structure of an unfamiliar problem, justify an approach, implement it clearly, and verify it under interview conditions.
