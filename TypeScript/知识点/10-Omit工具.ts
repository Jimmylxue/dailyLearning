{
	/**
	 * Omit<T,K>
	 *  Omit 英文意思是  省略、过滤
	 *  此工具可认为是适用于键值对对象的 Exclude，它会去除类型 T 中包含 K 的键值对。
	 *    Exclude 的升级版本 能够适用于 联合类型了！！
	 */

	type Person = {
		name: string
		age: number
		height: number
		weight: number
		sex: boolean
		lover: string
	}

	type Coder = {
		// name: string;
		// age: number;
		// sex: boolean;
		dz: string
	}

	type NotSame = Omit<Person, 'name'>
	/**
   * NotSame 的类型为：
   *  {
        age: number;
        height: number;
        weight: number;
        sex: boolean;
        lover: string;
      }
   */
}
