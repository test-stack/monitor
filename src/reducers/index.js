import { combineReducers } from "redux";
import slots, * as fromSlots from "./slots";

export default combineReducers({ slots });

export const getStateSlotDialog = state => {
  return fromSlots.getStateSlotDialog(state.slots.showTimeSlotDialog);
};

export const getProgressSlotDialog = state => {
  return fromSlots.getProgressSlotDialog(state.slots.progressSlotDialog);
};

export const getSlots = state => {
  return fromSlots.getSlots(state.slots.slots);
};

export const getSelectedSlot = state => {
  return fromSlots.getSelectedSlot(state.slots.selectSlotById);
};

export const getStateDeleteSlotDialog = state => {
  return fromSlots.getStateSlotDialog(state.slots.showDeleteSlotDialog);
};

export const getProgressDiscardSlot = state => {
  return fromSlots.getProgressDiscardSlot(state.slots.progressDiscard);
};
