﻿/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {Live2DCubismFramework as cubismjson} from "../utils/cubismjson";
import {Live2DCubismFramework as cubismid} from "../id/cubismid";
import {Live2DCubismFramework as cubismframework} from "../live2dcubismframework";
import CubismFramework = cubismframework.CubismFramework;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismJson = cubismjson.CubismJson;


export namespace Live2DCubismFramework
{
    const Meta: string = "Meta";
    const UserDataCount: string = "UserDataCount";
    const TotalUserDataSize: string = "TotalUserDataSize";
    const UserData: string = "UserData";
    const Target: string = "Target";
    const Id: string = "Id";
    const Value: string = "Value";

    export class CubismModelUserDataJson
    {
        /**
         * コンストラクタ
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         */
        public constructor(buffer: ArrayBuffer, size: number)
        {
            this._json = CubismJson.create(buffer, size);
        }

        /**
         * デストラクタ相当の処理
         */
        public release(): void
        {
            CubismJson.delete(this._json);
        }

        /**
         * ユーザーデータ個数の取得
         * @return ユーザーデータの個数
         */
        public getUserDataCount(): number
        {
            return this._json.getRoot().getMap().getValue(Meta).getMap().getValue(UserDataCount).toInt();
        }

        /**
         * ユーザーデータ総文字列数の取得
         * 
         * @return ユーザーデータ総文字列数
         */
        public getTotalUserDataSize(): number
        {
            return this._json.getRoot().getMap().getValue(Meta).getMap().getValue(TotalUserDataSize).toInt();
        }

        /**
         * ユーザーデータのタイプの取得
         * 
         * @return ユーザーデータのタイプ
         */
        public getUserDataTargetType(i: number): string
        {
            return this._json.getRoot().getMap().getValue(UserData).getVector().at(i).getMap().getValue(Target).getRawString();
        }

        /**
         * ユーザーデータのターゲットIDの取得
         * 
         * @param i インデックス
         * @return ユーザーデータターゲットID
         */
        public getUserDataId(i: number): CubismIdHandle
        {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getMap().getValue(UserData).getVector().at(i).getMap().getValue(Id).getRawString());
        }

        /**
         * ユーザーデータの文字列の取得
         * 
         * @param i インデックス
         * @return ユーザーデータ
         */
        public getUserDataValue(i: number): string
        {
            return this._json.getRoot().getMap().getValue(UserData).getVector().at(i).getMap().getValue(Value).getRawString();
        }

        private _json: CubismJson;
    }
}