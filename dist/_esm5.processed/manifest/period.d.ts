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
import { ICustomError } from "../errors";
import Adaptation, { IAdaptationArguments, IAdaptationType, IRepresentationFilter } from "./adaptation";
export declare type IManifestAdaptations = Partial<Record<IAdaptationType, Adaptation[]>>;
export declare type IAdaptationsArguments = Partial<Record<IAdaptationType, IAdaptationArguments[]>>;
export interface IPeriodArguments {
    id: string;
    adaptations: IAdaptationsArguments;
    start: number;
    duration?: number;
}
/**
 * Class representing a single `Period` of the Manifest.
 * A Period contains every informations about the content available for a
 * specific period in time.
 * @class Period
 */
export default class Period {
    readonly id: string;
    adaptations: IManifestAdaptations;
    duration?: number;
    start: number;
    end?: number;
    readonly parsingErrors: Array<Error | ICustomError>;
    /**
     * @constructor
     * @param {Object} args
     * @param {function|undefined} [representationFilter]
     */
    constructor(args: IPeriodArguments, representationFilter?: IRepresentationFilter);
    /**
     * Returns every `Adaptations` (or `tracks`) linked to that Period, in an
     * Array.
     * @returns {Array.<Object>}
     */
    getAdaptations(): Adaptation[];
    /**
     * Returns every `Adaptations` (or `tracks`) linked to that Period for a
     * given type.
     * @param {string} adaptationType
     * @returns {Array.<Object>}
     */
    getAdaptationsForType(adaptationType: IAdaptationType): Adaptation[];
    /**
     * Returns the Adaptation linked to the given ID.
     * @param {number|string} wantedId
     * @returns {Object|undefined}
     */
    getAdaptation(wantedId: string): Adaptation | undefined;
}
