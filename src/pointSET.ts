// import Point2D from "./doNotTouch/point2D";
// import RectHV from "./doNotTouch/rectHV";

// class PointSET {
//     public constructor() {} // construct an empty set of points
//     public isEmpty(): boolean {} // is the set empty?
//     public size(): number {} // number of points in the set
//     public insert(p: Point2D): void {} // add the point to the set (if it is not already in the set)
//     public contains(p: Point2D): boolean {} // does the set contain point p?
//     public draw(p): void {} // draw all points to p5
//     public range(rect: RectHV): Point2D[] {} // all points that are inside the rectangle (or on the boundary)
// }

// export default PointSET;

import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class PointSET {
  private points: Point2D[];


// construct an empty set of points
  public constructor() {
    this.points = [];
  } 

// is the set empty?
  public isEmpty(): boolean {
    return this.points.length === 0;
  } 

// number of points in the set
  public size(): number {
    return this.points.length;
  }

// add the point to the set (if it is not already in the set)
  public insert(p: Point2D): void {
    if (!this.contains(p)) {
      this.points.push(p);
    }
  } 

// does the set contain point p?
  public contains(p: Point2D): boolean {
    return this.points.some(point => point.equals(p));
  } 

// draw all points to p5
  public draw(p: any): void {
    this.points.forEach(point => {
      point.draw(p); 
    });
  } 

// all points that are inside the rectangle (or on the boundary)
  public range(rect: RectHV): Point2D[] {
    return this.points.filter(point => rect.contains(point));
  } 
}

export default PointSET;