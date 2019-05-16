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
import { IEventEmitter } from "../utils/event_emitter";
interface ICustomSourceBufferEvents {
    updatestart: Event | undefined;
    update: Event | undefined;
    updateend: Event | undefined;
    error: Event;
}
export interface ICustomSourceBuffer<T> extends IEventEmitter<ICustomSourceBufferEvents> {
    buffered: TimeRanges;
    changeType?: (type: string) => void;
    updating: boolean;
    timestampOffset: number;
    appendBuffer(data: T): void;
    remove(from: number, to: number): void;
    abort(): void;
}
/**
 * If the changeType MSE API is implemented, update the current codec of the
 * SourceBuffer and return true if it succeeded.
 * In any other cases, return false.
 * @param {Object} sourceBuffer
 * @param {string} codec
 * @returns {boolean}
 */
export default function tryToChangeSourceBufferType(sourceBuffer: ICustomSourceBuffer<unknown>, codec: string): boolean;
export {};
