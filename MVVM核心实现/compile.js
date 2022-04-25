class Compile {
  constructor(el, vm) {
    this.vm = vm;
    this.container = this.isElementNode(el) ? el : document.getElementById(el);

    let fragment = this.getFragment(this.container);

    this.compile(fragment);

    this.container.appendChild(fragment);
  }

  isElementNode(el) {
    // nodeType === 1 代表的是 元素节点
    return el.nodeType === 1;
  }

  getFragment(node) {
    // 创建node文档碎片
    let fragment = document.createDocumentFragment();
    while (node.firstChild) {
      fragment.appendChild(node.firstChild);
    }
    return fragment;
    // console.log(node.firstChild);
  }

  compile(fragment) {
    let childNode = fragment.childNodes;
    console.log(childNode);

    [...childNode].map((node) => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node); // 递归编译
      } else {
        // 文本内容
        this.compileText(node);
      }
    });
  }

  /**
   * 编译节点元素  主要是处理类似于 v-if  @click 之类的一些特殊的指令
   */
  compileElement(node) {
    // 元素<div v-on="test()">{{title}}</div>
  }

  /**
   * 编译文本
   */
  compileText(node) {
    let text = node.textContent;
    if (/\{\{(.+?)\}\}/.test(text)) {
      compileTool["text"](node, text, this.vm);
    }
  }
}
