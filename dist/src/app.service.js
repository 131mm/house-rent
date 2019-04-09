"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio = require("cheerio");
class AppService {
    remote_get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise(function (resolve, reject) {
                axios_1.default.get(url).then((res) => {
                    resolve(res.data);
                }, (err) => {
                    reject(err);
                });
            });
            return promise;
        });
    }
    getInfo(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let page1 = Number(page) * 25;
            page = String(page1);
            let base_url = 'https://www.douban.com/group/szsh/discussion?start=' + page;
            const res = yield this.remote_get(base_url);
            const $ = cheerio.load(res);
            let titles = {
                item: []
            };
            $('.olt').find('tr').find('.title').each((index, element) => {
                let title = $(element).find('a');
                let titlet = $(title).attr('title').trim();
                let url = $(title).attr('href').trim();
                let user = $(element).next().find('a').text();
                let user_url = $(element).next().find('a').attr('href');
                let views = $(element).next().next().text();
                let time = $(element).next().next().next().text();
                titles.item.push({ titlet, url, user, user_url, views, time });
            });
            return titles;
        });
    }
}
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map