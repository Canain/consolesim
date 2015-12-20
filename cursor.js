/**
 * Position the Cursor: \033[<L>;<C>H or \033[<L>;<C>f (puts the cursor at line L and column C)
 * Move the cursor up N lines: \033[<N>A
 * Move the cursor down N lines: \033[<N>B
 * Move the cursor forward N columns: \033[<N>C
 * Move the cursor backwards N columns: \033[<N>D
 * Clear the screen, move to (0,0): \033[2J
 * Erase to end of line: \033[K
 * Save cursor position: \033[s
 * Restore cursor position: \033[u
 * process.stdout.write()
 */

process.stdout.write('Hello');
process.stdout.write('\u001b[2J');