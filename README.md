##StyleNames

####What does StyleNames?
  In one short sentence: "StyleNames converts an object to a css style string."

####Install
```
npm install stylenames -D
```
####Import
 ```javascript
 import styleNames from 'stylenames';
 ```


####StyleNames object - StyleGuide
```javascript
    styleNames({
        'style-key':'style-value',
        
        // If the condition is false the style does not becomes used.
        'style-key':{
            'style-value': condition
        },
                    
        // Only the first value with true condition becomes used.
        'style-key':{
            'style-value1': condition,
            'style-value2': condition,
            'style-value3': condition,
             ...
        }
    });
```
###Examples:

#####Without conditions:
  ```javascript
    let styles1 = styleNames({
        height: '120px',
        width: '100px'
    });
    console.log(styles1); //--> ' height:120px;width:100px; '
  ```
       
#####With one condition
  ```javascript
    let styles1 = styleNames({
        height: '120px',
        width: {
            '200px': false
        }
    });
    console.log(styles1); //--> ' height:120px '
   
    let styles2 = styleNames({
        height: '120px',
        width: {
            '200px': true
        }
    });
    console.log(styles2); //--> ' height:120px;width:200px; '
   ```
#####With more than one condition

```javascript
    let itemCount = 0;
 
    let styleNamesConfig = {
        display: {
            'none': () => itemCount === 0
        },
        height: '120px',
        width: {
            '100px': () => itemCount <= 1,
            '200px': () => itemCount <= 2,
            '400px': () => itemCount <= 4,
            '100%': () => itemCount > 4
        }
    };
 
    console.log(styleNames(styleNamesConfig)); //--> ' display:none;height:120px;width:100px; '
 
    itemCount++; //1
    console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:100px; '
 
    itemCount++; //2
    console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:200px; '
 
    itemCount++; //3
    console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:400px; '
 
    itemCount += 12; //15
    console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:100%; '

```
 