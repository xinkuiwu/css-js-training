const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
  };
  
  function defaultCompare(a, b) {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
  
  function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
  }
  //冒泡排序
  function bubbleSort(array, compareFn = defaultCompare) {
    const {length} = array;//获取长度
    for (let i = 0; i < length; i++){
      for (let j = 0; j < length - 1; j++) {
        if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
          swap(array, j, j + 1);//每次取最大的在后面
        }
      }
    }
    return array;
  }

    //快速排序
    function partition(array, left, right, compareFn){
        const pivot = array[Math.floor((left + right) / 2)];//中间元素
        let i = left;
        let j = right;
        while (i <= j) {
          while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++;//如果左边元素比中间元素小，比较下一个元素
          }
          while (compareFn(array[j],pivot) === Compare.BIGGER_THAN) {
            j--;//如果右边元素比中间元素到，比较前一个元素
          }
          if (i <= j) {
            swap(array, i ,j);//找到需要交换的元素，则交换
            i++;//索引继续变化
            j--;
          }
        }
        return i;//返回交汇的数组索引，代表真正的中间的值的索引
      }
      
      function quick(array, left, right, compareFn) {
        let index;//划分点索引
        if (array.length > 1) {
          index = partition(array, left, right, compareFn);
          if (left < index - 1) {
            quick(array, left, index - 1, compareFn);//二分下去
          }
          if (index < right) {
            quick(array, index, right, compareFn);//二分下去
          }
        }
        return array;
      }
      
      function quickSort(array, compareFn = defaultCompare) {
        return quick(array, 0, array.length - 1, compareFn);
      }
  //直接插入排序
  function insertionSort(array, compareFn = defaultCompare) {
    const {length} = array;
    let temp;
    for (let i = 1; i < length; i++) {
      let j = i;
      temp = array[j];//当前元素
      while(j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
        array[j] = array [j - 1];//先比较前一个元素，把最大的方在后面，交换顺序
        j--;//比较之前的情况
      }
      array[j] = temp;//在合适的地方插入元素
    }
    return array;
  }
//希尔排序
function shellSort(array, compareFn = defaultCompare) {
    const {length} = array;
    let temp;
    let gap = Math.floor(length/2);
    while(gap){
        for (let i = gap; i < length; i+=gap) {
        let j = i;
        temp = array[j];//当前元素
        while(j > 0 && compareFn(array[j - gap], temp) === Compare.BIGGER_THAN) {
            array[j] = array [j - gap];//先比较前gap个元素，把最大的方在后面，交换顺序
            j-=gap;//比较之前的情况
        }
        array[j] = temp;//在合适的地方插入元素
        }
        gap = Math.floor(gap/2);
    }
    return array;
  }