'def': function(stack) {
        var name = stack.pop();
        var value = stack.pop();

        Munch.dictionary[name] = value;

        return stack;
      },

      'if': function(stack) {
        var quot = stack.pop();
        var num = stack.pop();
        if(num != 0) {
          stack = Munch.eval(quot, stack);
        }

        return stack;
      },

      'maybe': function(stack){
          var quot = stack.pop(); 
          var chance = Math.random() * 10; 
          console.log(chance);

          chance > 5 ? stack = Munch.eval(quot, stack) : stack = stack; 
      
          return stack;
      },

      'times': function(stack) {
        var numTimes = stack.pop();
        var quot = stack.pop();
            
            for (var i = 0; i < numTimes; i++) {
                stack = Munch.eval(quot, stack);
                 }

        return stack;
      },

      'dup': function(stack){
        var a = stack.pop(); 
        stack.push(a, a);

        return stack;
      },
      
      'swap': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        stack.push(a, b);

        return stack;
      },

      'rollup': function(stack) {
        var a = stack.shift();
        stack.push(a); 
        
        return stack; 
      },
      
      'rolldown': function(stack){
        var a = stack.pop();
        stack.unshift(a);

        return stack;
      },

      '+': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        stack.push(a + b);

        return stack;
      },

      '-': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        stack.push(a - b);

        return stack;
      },
      
      '*': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        stack.push(a * b);

        return stack;
      },

      '/': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        stack.push(a / b);

        return stack;
      },  

      '÷': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        stack.push(a % b);

        return stack;
      },  


      '>': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        
        a > b ? stack.push(true) : stack.push(false);

        return stack;
      },  


      '=': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        
        a == b ? stack.push(true) : stack.push(false);

        return stack;
      }, 


      '<': function(stack) {
        var a = stack.pop();
        var b = stack.pop();
        
        a < b ? stack.push(true) : stack.push(false);

        return stack;
      },   

      'true': function(stack){
          stack.push(true);

          return stack;
      },

      'false': function(stack){
          stack.push(false);

          return stack;

      },

      'random': function(stack){
          var a = Math.random();
          stack.push(a); 
          //console.log(a);
          return stack;
      },

      //Snowman checks for a prime number, returns a boolean
      //to the stack. 

      '☃': function(stack){
          var is_prime = true; 
          var a = stack.pop();
          
          for (var i = 2; i <= Math.sqrt(a); i++) {
            if (a % i == 0){
                is_prime = false;
                }
              }
          stack.push(is_prime);

          return stack;
      }
    },


    var stack;
      if(initialStack != undefined)
        // if an initial stack is provided, use that
        stack = initialStack;
      else
        // otherwise, use an empty array 
        stack = [];
      
      // loop through every item in the source
      for (var i = 0; i < source.length; i++) {
        if( source[i].word != undefined ) {
          // if the item is a word, look it up in the dictionary
          var wordValue = Munch.dictionary[source[i].word];
          if( typeof wordValue == "function" ) {
            // if the word's value is a function execute it with the current stack as an argument
            // make current stack into the result
            stack = wordValue(stack.clone());

          } else if( typeof wordValue == "object" ) {
            // if the word's value is a quotation, execute it on the current stack   
            stack = Munch.eval(wordValue, stack);

          } else if( wordValue == undefined ) {
            // if the word's value was not found, throw an error
            throw new Error("Unknown word '" + source[i].word + "'!");

          } else {
            // else, we know the word's value is not a function or undefined, push it to the stack
            stack.push(wordValue);
          }

        } else {
          // else, we know that the item is not a word, push it to the stack
          stack.push(source[i]);

        }
      }

      // return the stack we operated on
      return stack;
    }
  }

<!--

PEG syntax quick reference

'x'   : match the literal character 'x'
x+    : match x 1 or more times
x*    : match x 0 or more times
x?    : match x 0 or 1 times
!x    : match anything but the match x
x/y   : match x or y, trying in that order
[xyz] : match one of the literal character 'x', 'y', or 'z'
v:x   : assign the result of the match x to the variable v

Full documentation: http://pegjs.majda.cz/documentation#grammar-syntax-and-semantics-parsing-expression-types

-->


<!-- <grammar>
  start       = p:literal+ { return Munch.eval(p) }

  literal     = number / string / quotation / word

  word        = w:[^\[\] ]+ space { return { word:w.join('') } }

  quotation   = '[' q:literal+ ']' space { return q }

  string      = '"' s:[^"]* '"' space { return s.join('') }

  number      = float / integer
  float       = s:'-'? n:(digit* '.' digit+) space { return parseFloat(s + n.flatten().join('')) }
  integer     = s:'-'? d:digit+ space { return parseInt(s + d.join('')) }

  digit       = [0123456789]

  space       = ' '*
  SPACE       = ' '+ / !.
</grammar> -->

