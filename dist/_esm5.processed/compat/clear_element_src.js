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
import log from "../log";
import { isFirefox } from "./browser_detection";
/**
 * Clear element's src attribute.
 *
 * On IE11, element.src = "" is not sufficient as it
 * does not clear properly the current MediaKey Session.
 * Microsoft recommended to use element.removeAttr("src").
 * @param {HTMLMediaElement} element
 */
export default function clearElementSrc(element) {
    if (isFirefox) {
        var textTracks = element.textTracks;
        for (var i = 0; i < textTracks.length; i++) {
            textTracks[i].mode = "disabled";
        }
        if (element.hasChildNodes()) {
            var childNodes = element.childNodes;
            for (var j = childNodes.length - 1; j >= 0; j--) {
                if (childNodes[j].nodeName === "track") {
                    try {
                        element.removeChild(childNodes[j]);
                    }
                    catch (err) {
                        log.warn("Could not remove text track child from element.");
                    }
                }
            }
        }
    }
    element.src = "";
    element.removeAttribute("src");
}
