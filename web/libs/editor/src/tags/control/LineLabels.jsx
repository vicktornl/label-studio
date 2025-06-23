import { observer } from "mobx-react";
import { types } from "mobx-state-tree";

import LabelMixin from "../../mixins/LabelMixin";
import Registry from "../../core/Registry";
import SelectedModelMixin from "../../mixins/SelectedModel";
import Types from "../../core/Types";
import { HtxLabels, LabelsModel } from "./Labels/Labels";
import { LineModel } from "./Line";
import ControlBase from "./Base";

/**
 * 
 * LineLabels allows you to add multiple lines to an image (instead of only 1 with <Line>)
 * <LineLabels name="linelabelname" arrow="true">
 *    <Label value="First Label" />
 *    <Label value="Second Label" />
 * </LineLabels>
 * */

const Validation = types.model({
  controlledTags: Types.unionTag(["Image"]),
});

const ModelAttrs = types.model("LineLabelsModel", {
  type: "linelabels",
  children: Types.unionArray(["label", "header", "view", "hypertext"]),
});

const Composition = types.compose(
  ControlBase,
  LabelsModel,
  ModelAttrs,
  LineModel,
  Validation,
  LabelMixin,
  SelectedModelMixin.props({ _child: "LabelModel" }),
);

const LineLabelsModel = types.compose("LineLabelsModel", Composition);

const HtxLineLabels = observer(({ item }) => {
  return <HtxLabels item={item} />;
});

Registry.addTag("linelabels", LineLabelsModel, HtxLineLabels);

export { HtxLineLabels, LineLabelsModel };
