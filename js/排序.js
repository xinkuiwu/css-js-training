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
  //选择排序
function selectionSort(array, compareFn = defaultCompare) {
    const {length} = array;
    let indexMin;
    for (let i = 0; i < length -1; i++) {
      indexMin = i;
      for (let j = i; j < length; j++) {
        if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
          indexMin = j;
        }
      }
      if (i !== indexMin) {
        swap(array, i, indexMin);
      }
    }
    return array;
  }
  //堆排序
function heapify(array, index, heapSize, compareFn) {
    let largest = index;
    const left = (2 * index) + 1;
    const right = (2 * index) + 2;
    if (left < heapSize && compareFn(array[left], array[index]) > 0) {
      largest = left;
    }
    if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
      largest = right;
    }
    if (largest !== index) {
      swap(array, index, largest);
      heapify(array, largest, heapSize, compareFn);
    }
  }
  
  function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      heapify(array, i, array.length, compareFn);
    }
    return array;
  }
  
  function heapSort(array = [], compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);
    while (heapSize > 1) {
      swap(array, 0, --heapSize);
      heapify(array, 0, heapSize, compareFn);
    }
    return array;
  } 
//归并排序
function merge(left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);

  }//合并升序序列
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));//把剩下部分合并
}

function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const {length} = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);//递归二分
    const right = mergeSort(array.slice(middle, length), compareFn);//递归二分
    array = merge(left, right, compareFn);//合并
  }
  return array;
}
//计数排序
function findMaxValue(array) {
  let max = array[0];
  for (let i = 1; i < array.length - 1; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}
function countingSort(array) {
  if (array.length < 2) {
    return array;
  }
  const maxValue = findMaxValue(array);//找到最大值
  let sortedIndex = 0;
  const counts = new Array(maxValue + 1);//辅助数组,设置长度
  array.forEach(element => {
    if (!counts[element]) {
      counts[element] = 0;
    }
    counts[element]++;//计数，相当于按照下标索引计数
  });
  counts.forEach((element, i) => {
    while(element > 0) {
      array[sortedIndex++] = i;//i是counts数组的索引，相当于是原数组的值
      element--;//计数减一
    }
  });
  return array;
}
//桶排序
// const insertionSort = (array, compareFn = defaultCompare) => {
//   const { length } = array;
//   let temp;
//   for (let i = 1; i < length; i++) {
//     let j = i;
//     temp = array[i];
//     while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
//       array[j] = array[j - 1];
//       j--;
//     }
//     array[j] = temp;
//   }
//   return array;
// };

function creatBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }//找最大，最小值
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  //根据最大最小值和桶的尺寸，创建桶（计数数组），需要多少个桶
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];//创建桶，即辅助数组，多个桶
  } 
  for (let i = 0; i < array.length; i++) {
    //把对应排序数组的元素按大小范围放入不同的桶中，相当于值小的元素先放在前面的桶中
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
  }
  return buckets;
}
function sortBuckets(buckets) {
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      insertionSort(buckets[i]);//对每个桶进行排序，例如插入排序
      sortedArray.push(...buckets[i]);//合并每个桶，得到最后排序结果
    }
  }
  return sortedArray;
}

function bucketSort (array, bucketSize = 5) {
  if (array.length < 2) {
    return array;
  }
  const buckets = creatBuckets(array, bucketSize);
  return sortBuckets(buckets);
}
//基数排序
function findMaxValue(array, compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (compareFn(max, array[i]) === Compare.LESS_THAN) {
        max = array[i];
      }
    }
    return max;
  }
  return undefined;
}
 function findMinValue(array, compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let min = array[0];
    for (let i = 1; i < array.length; i++) {
      if (compareFn(min, array[i]) === Compare.BIGGER_THAN) {
        min = array[i];
      }
    }
    return min;
  }
  return undefined;
}

const getBucketIndex = (value, minValue, significantDigit, radixBase) =>
  Math.floor(((value - minValue) / significantDigit) % radixBase);

const countingSortForRadix = (array, radixBase, significantDigit, minValue) => {
  let bucketsIndex;
  const buckets = [];
  const aux = [];//辅助数组
  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0;//根据基数确定桶的数量，例如十进制，有十个桶
  }
  for (let i = 0; i < array.length; i++) {
    //确定原数组元素位于哪个桶的位置
    bucketsIndex = getBucketIndex(array[i], minValue, significantDigit, radixBase);
    buckets[bucketsIndex]++;//计数桶的元素个数
  }
  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1];//计算包括当前桶和之前的元素个数
  }
  for (let i = array.length - 1; i >= 0; i--) {
    bucketsIndex = getBucketIndex(array[i], minValue, significantDigit, radixBase);
    aux[--buckets[bucketsIndex]] = array[i];
    //倒序地，每次减少计数地，将原数组元素赋值给对应位置的辅助数组。
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = aux[i];
  }
  return array;
};
function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array;
  }
  const minValue = findMinValue(array);//找到最小值
  const maxValue = findMaxValue(array);//找到最大值
  let significantDigit = 1;//有效数字
  while ((maxValue - minValue) / significantDigit >= 1) {    
    array = countingSortForRadix(array, radixBase, significantDigit, minValue);
    significantDigit *= radixBase;//有基数更新有效数字
  }
  return array;
}

  const array = [3,5,7,4,8,1,2,6];
  console.log(array);
  console.log(radixSort(array))
 