import { types } from "mobx-state-tree";
import Registry from "../core/Registry";
import { PolygonRegionModel, HtxPolygon } from "./PolygonRegion";

const Model = types
  .model({
    type: "lineregion",
    minNumPoints: types.optional(types.integer, 2),
    maxNumPoints: types.optional(types.integer, 2),
    canAddPointsAfterClosure: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get maxPointsReached() {
      return self.maxNumPoints && self.points.length >= self.maxNumPoints;
    },
    get showArrow() {
      return self.control.arrow == true;
    },
  }));

const LineRegionModel = types.compose(
  "LineRegionModel",
  PolygonRegionModel,
  Model,
);

const HtxLine = HtxPolygon;

Registry.addTag("lineregion", LineRegionModel, HtxLine);
Registry.addRegionType(
  LineRegionModel,
  "image",
  (value) => value.results[0].type == "line",
);

export { LineRegionModel, HtxLine };
