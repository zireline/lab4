import Point2D from './doNotTouch/point2D';
import RectHV from './doNotTouch/rectHV';

class TreeNode {
  point: Point2D;
  leftChild: TreeNode | null = null;
  rightChild: TreeNode | null = null;

  constructor(point: Point2D) {
    this.point = point;
  }
}

class KDTree {
  rootNode: TreeNode | null = null;
  nodeCount: number = 0;

  public constructor() {
    // default constructor
  }

  public isEmpty(): boolean {
    return this.rootNode === null;
  }

  public size(): number {
    return this.nodeCount;
  }

  public insert(point: Point2D): void {
    this.rootNode = this.insertNode(this.rootNode, point, 0);
  }

  private insertNode(
    node: TreeNode | null,
    point: Point2D,
    depth: number
  ): TreeNode {
    if (node === null) {
      this.nodeCount++;
      return new TreeNode(point);
    }

    const coordinate = depth % 2;
    const isXCoordinate = coordinate === 0;
    const isPointLessThanNode = isXCoordinate
      ? point.x < node.point.x
      : point.y < node.point.y;

    if (isPointLessThanNode) {
      node.leftChild = this.insertNode(node.leftChild, point, depth + 1);
    }

    if (!isPointLessThanNode) {
      node.rightChild = this.insertNode(node.rightChild, point, depth + 1);
    }

    return node;
  }

  public contains(point: Point2D): boolean {
    return this.search(this.rootNode, point, 0);
  }

  private search(
    node: TreeNode | null,
    point: Point2D,
    depth: number
  ): boolean {
    if (node === null) return false;

    if (node.point.x === point.x && node.point.y === point.y) return true;

    const coordinate = depth % 2;
    const isXCoordinate = coordinate === 0;
    const isPointLessThanNode = isXCoordinate
      ? point.x < node.point.x
      : point.y < node.point.y;

    if (!isPointLessThanNode) {
      return this.search(node.rightChild, point, depth + 1);
    }

    return this.search(node.leftChild, point, depth + 1);
  }

  public range(rectangle: RectHV): Point2D[] {
    const resultPoints: Point2D[] = [];
    this.rangeSearch(this.rootNode, rectangle, 0, resultPoints);
    return resultPoints;
  }

  private rangeSearch(
    node: TreeNode | null,
    rectangle: RectHV,
    depth: number,
    resultPoints: Point2D[]
  ): void {
    if (node === null) return;

    if (rectangle.contains(node.point)) resultPoints.push(node.point);

    const coordinate = depth % 2;
    const isXCoordinate = coordinate === 0;
    const nodePoint = isXCoordinate ? node.point.x : node.point.y;
    const rectangleMin = isXCoordinate ? rectangle.xmin : rectangle.ymin;
    const rectangleMax = isXCoordinate ? rectangle.xmax : rectangle.ymax;

    if (nodePoint >= rectangleMin) {
      this.rangeSearch(node.leftChild, rectangle, depth + 1, resultPoints);
    }

    if (nodePoint <= rectangleMax) {
      this.rangeSearch(node.rightChild, rectangle, depth + 1, resultPoints);
    }
  }
}

export default KDTree;
