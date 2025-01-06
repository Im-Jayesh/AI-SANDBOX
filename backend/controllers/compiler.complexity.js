// src/controllers/complexity.controller.js

// Function to analyze code complexity
const analyzeComplexity = (req, res) => {
    const { code } = req.body;  // Code from client

    const analysis = {
        loops: (code.match(/for|while/g) || []).length,
        nestedLoops: (code.match(/for[\s\S]*?for|while[\s\S]*?while/g) || []).length,
        recursion: code.match(/def\s+(\w+)\s*\(.*\):/g)?.some(func => 
            code.includes(func.split(' ')[1])),
        arrayOperations: (code.match(/\[\s*\]|\{\s*\}|list|dict|set/g) || []).length,
        
        quickSort: code.includes('pivot') && code.includes('partition') || 
                  (code.includes('quick') && code.includes('sort')),
        mergeSort: code.includes('merge') && code.includes('sort') || 
                  (code.includes('mid') && code.includes('merge')),
        
        binarySearch: code.includes('mid = left + (right - left)') || 
                     (code.includes('mid') && code.includes('left') && code.includes('right')),
        
        dfs: (code.includes('depth') && code.includes('search')) || 
             (code.includes('stack') && code.includes('visit')),
        bfs: (code.includes('breadth') && code.includes('search')) || 
             (code.includes('queue') && code.includes('visit')),
        
        dp: code.includes('dp[') || 
            (code.includes('memo') && code.includes('cache')) ||
            (code.match(/dp\s*=\s*\[\]/g) !== null)
    };

    const complexityResult = {
        timeComplexity: determineTimeComplexity(analysis),
        spaceComplexity: determineSpaceComplexity(analysis),
        algorithmType: determineAlgorithmType(analysis)
    };

    res.json(complexityResult);
};

// Helper functions for complexity analysis
function determineTimeComplexity(analysis) {
    if (analysis.quickSort) return "O(n log n) - average, O(n²) - worst";
    if (analysis.mergeSort) return "O(n log n)";
    if (analysis.binarySearch) return "O(log n)";
    if (analysis.dfs || analysis.bfs) return "O(V + E) - V vertices, E edges";
    if (analysis.dp) return "O(n) - typical case, varies with problem";
    if (analysis.nestedLoops > 0) return "O(n²)";
    if (analysis.loops > 0) return "O(n)";
    if (analysis.recursion) return "O(n)";
    return "O(1)";
}

function determineSpaceComplexity(analysis) {
    if (analysis.mergeSort) return "O(n)";
    if (analysis.quickSort) return "O(log n) - average";
    if (analysis.dfs) return "O(h) - h is height of tree/graph";
    if (analysis.bfs) return "O(w) - w is maximum width";
    if (analysis.dp) return "O(n) - typical case";
    if (analysis.recursion) return "O(n)";
    if (analysis.arrayOperations > 0) return "O(n)";
    return "O(1)";
}

function determineAlgorithmType(analysis) {
    if (analysis.quickSort || analysis.mergeSort) return "Sorting Algorithm";
    if (analysis.binarySearch) return "Search Algorithm";
    if (analysis.dfs) return "Depth-First Search";
    if (analysis.bfs) return "Breadth-First Search";
    if (analysis.dp) return "Dynamic Programming";
    if (analysis.recursion) return "Recursive Algorithm";
    return "Basic Algorithm";
}

module.exports = {
    analyzeComplexity
};
