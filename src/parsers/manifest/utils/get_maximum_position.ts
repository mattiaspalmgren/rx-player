/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import log from "../../../log";
import {
  IParsedPartialPeriod,
  IParsedPeriod,
} from "../types";
import getLastPositionFromAdaptation from "./get_last_time_from_adaptation";

export interface INeedsToLoadPeriodEvent {
  type : "needs-to-load-period";
  value : IParsedPartialPeriod;
}

export interface IResultEvent {
  type : "result";
  value : number | undefined;
}

/**
 * @param {Array.<Object>} periods
 * @returns {Object}
 */
export default function getMaximumPosition(periods : IParsedPeriod[]) : IResultEvent;
export default function getMaximumPosition(
  periods : Array<IParsedPartialPeriod | IParsedPeriod>
) : INeedsToLoadPeriodEvent | IResultEvent;
export default function getMaximumPosition(
  periods : Array<IParsedPartialPeriod | IParsedPeriod>
) : INeedsToLoadPeriodEvent | IResultEvent {
  for (let i = periods.length - 1; i >= 0; i--) {
    const period = periods[i];
    if (!period.isLoaded) {
      return { type: "needs-to-load-period",
               value: period };
    }
    const periodAdaptations = period.adaptations;
    const firstAudioAdaptationFromPeriod = periodAdaptations.audio === undefined ?
      undefined :
      periodAdaptations.audio[0];
    const firstVideoAdaptationFromPeriod =  periodAdaptations.video === undefined ?
      undefined :
      periodAdaptations.video[0];

    if (firstAudioAdaptationFromPeriod !== undefined ||
        firstVideoAdaptationFromPeriod !== undefined
    ) {
      // null == no segment
      let maximumAudioPosition : number | null = null;
      let maximumVideoPosition : number | null = null;
      if (firstAudioAdaptationFromPeriod !== undefined) {
        const lastPosition =
          getLastPositionFromAdaptation(firstAudioAdaptationFromPeriod);
        if (lastPosition === undefined) {
          return { type: "result", value: undefined };
        }
        maximumAudioPosition = lastPosition;
      }
      if (firstVideoAdaptationFromPeriod !== undefined) {
        const lastPosition =
          getLastPositionFromAdaptation(firstVideoAdaptationFromPeriod);
        if (lastPosition === undefined) {
          return { type: "result", value: undefined };
        }
        maximumVideoPosition = lastPosition;
      }

      if ((firstAudioAdaptationFromPeriod !== undefined &&
           maximumAudioPosition === null) ||
          (firstVideoAdaptationFromPeriod !== undefined &&
            maximumVideoPosition === null)
      ) {
        log.info("Parser utils: found Period with no segment. ",
                 "Going to previous one to calculate last position");
        return { type: "result", value: undefined };
      }

      if (maximumVideoPosition !== null) {
        const value = maximumAudioPosition !== null ?
          Math.min(maximumAudioPosition, maximumVideoPosition) :
          maximumVideoPosition;
        return { type: "result", value };
      }
      if (maximumAudioPosition !== null) {
        return { type: "result", value: maximumAudioPosition };
      }
    }
  }
  return { type: "result", value: undefined };
}
