import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Area } from '../models/area';

const areas = [
	{ id: 1, name: '北海道' },
	{ id: 2, name: '青森県' },
	{ id: 3, name: '岩手県' },
	{ id: 4, name: '宮城県' },
	{ id: 5, name: '秋田県' },
	{ id: 6, name: '山形県' },
	{ id: 7, name: '福島県' },
	{ id: 8, name: '茨城県' },
	{ id: 9, name: '栃木県' },
	{ id: 10, name: '群馬県' },
	{ id: 11, name: '埼玉県' },
	{ id: 12, name: '千葉県' },
	{ id: 13, name: '東京都' },
	{ id: 14, name: '神奈川県' },
	{ id: 15, name: '新潟県' },
	{ id: 16, name: '富山県' },
	{ id: 17, name: '石川県' },
	{ id: 18, name: '福井県' },
	{ id: 19, name: '山梨県' },
	{ id: 20, name: '長野県' },
	{ id: 21, name: '岐阜県' },
	{ id: 22, name: '静岡県' },
	{ id: 23, name: '愛知県' },
	{ id: 24, name: '三重県' },
	{ id: 25, name: '滋賀県' },
	{ id: 26, name: '京都府' },
	{ id: 27, name: '大阪府' },
	{ id: 28, name: '兵庫県' },
	{ id: 29, name: '奈良県' },
	{ id: 30, name: '和歌山県' },
	{ id: 31, name: '鳥取県' },
	{ id: 32, name: '島根県' },
	{ id: 33, name: '岡山県' },
	{ id: 34, name: '広島県' },
	{ id: 35, name: '山口県' },
	{ id: 36, name: '徳島県' },
	{ id: 37, name: '香川県' },
	{ id: 38, name: '愛媛県' },
	{ id: 39, name: '高知県' },
	{ id: 40, name: '福岡県' },
	{ id: 41, name: '佐賀県' },
	{ id: 42, name: '長崎県' },
	{ id: 43, name: '熊本県' },
	{ id: 44, name: '大分県' },
	{ id: 45, name: '宮崎県' },
	{ id: 46, name: '鹿児島県' },
	{ id: 47, name: '沖縄県' },
	{ id: 0, name: 'その他' },
];

const enNames: { [key: string]: string } = {
	北海道: 'hokkaido',
	青森県: 'aomori',
	岩手県: 'iwate',
	宮城県: 'miyagi',
	秋田県: 'akita',
	山形県: 'yamagata',
	福島県: 'fukushima',
	茨城県: 'ibaraki',
	栃木県: 'tochigi',
	群馬県: 'gunma',
	埼玉県: 'saitama',
	千葉県: 'chiba',
	東京都: 'tokyo',
	神奈川県: 'kanagawa',
	新潟県: 'niigata',
	富山県: 'toyama',
	石川県: 'ishikawa',
	福井県: 'fukui',
	山梨県: 'yamanashi',
	長野県: 'nagano',
	岐阜県: 'gifu',
	静岡県: 'shizuoka',
	愛知県: 'aichi',
	三重県: 'mie',
	滋賀県: 'shiga',
	京都府: 'kyoto',
	大阪府: 'osaka',
	兵庫県: 'hyogo',
	奈良県: 'nara',
	和歌山県: 'wakayama',
	鳥取県: 'tottori',
	島根県: 'shimane',
	岡山県: 'okayama',
	広島県: 'hiroshima',
	山口県: 'yamaguchi',
	徳島県: 'tokushima',
	香川県: 'kagawa',
	愛媛県: 'ehime',
	高知県: 'kochi',
	福岡県: 'fukuoka',
	佐賀県: 'saga',
	長崎県: 'nagasaki',
	熊本県: 'kumamoto',
	大分県: 'oita',
	宮崎県: 'miyazaki',
	鹿児島県: 'kagoshima',
	沖縄県: 'okinawa',
	その他: 'others',
};

const updatedAreas = areas.map(area => ({
	...area,
	en: enNames[area.name],
}));

async function loadArea() {
	try {
		dotenv.config();
		const mongoUserName = process.env.MONGO_USER;
		const mongoPWD = process.env.MONGO_PWD;
		await mongoose.connect(
			`mongodb+srv://${mongoUserName}:${mongoPWD}@cluster0.qtybgjl.mongodb.net/sake?retryWrites=true&w=majority&appName=Cluster0`
		);
		await Area.insertMany(updatedAreas);
		mongoose.connection.close();
	} catch (e) {
		console.log(e);
	}
}

loadArea();
