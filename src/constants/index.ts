import { UseFormProps } from 'react-hook-form';

const { EMAIL_USERNAME, EMAIL_NAME } = process.env;

/* ------- Constant ------- */
export const DATE_FORMAT = {
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateView: 'MM/DD/YYYY',
};

export const EMAIL_PROFILE = { address: EMAIL_USERNAME, name: EMAIL_NAME };

export const WEAK_PASSWORDS = [
  '123456',
  '123456789',
  'picture1',
  'password',
  '12345678',
  '111111',
  '123123',
  '12345',
  '1234567890',
  'senha',
  '1234567',
  'qwerty',
  'abc123',
  'Million2',
  '000000',
  '1234',
  'iloveyou',
  'aaron431',
  'password1',
  'qqww1122',
  '123',
  'omgpop',
  '123321',
  '654321',
  'qwertyuiop',
  'qwer123456',
  '123456a',
  'a123456',
  '666666',
  'asdfghjkl',
  'ashley',
  '987654321',
  'unknown',
  'zxcvbnm',
  '112233',
  'chatbooks',
  '20100728',
  '123123123',
  'princess',
  'jacket025',
  'evite',
  '123abc',
  '123qwe',
  'sunshine',
  '121212',
  'dragon',
  '1q2w3e4r',
  '5201314',
  '159753',
  '123456789',
  'pokemon',
  'qwerty123',
  'Bangbang123',
  'jobandtalent',
  'monkey',
  '1qaz2wsx',
  'abcd1234',
  'default',
  'aaaaaa',
  'soccer',
  '123654',
  'ohmnamah23',
  '12345678910',
  'zing',
  'shadow',
  '102030',
  '11111111',
  'asdfgh',
  '147258369',
  'qazwsx',
  'qwe123',
  'michael',
  'football',
  'baseball',
  '1q2w3e4r5t',
  'party',
  'daniel',
  'asdasd',
  '222222',
  'myspace1',
  'asd123',
  '555555',
  'a123456789',
  '888888',
  '7777777',
  'fuckyou',
  '1234qwer',
  'superman',
  '147258',
  '999999',
  '159357',
  'love123',
  'tigger',
  'purple',
  'samantha',
  'charlie',
  'babygirl',
  '88888888',
  'jordan23',
  '789456123',
  'jordan',
  'anhyeuem',
  'killer',
  'basketball',
  'michelle',
  '1q2w3e',
  'lol123',
  'qwerty1',
  '789456',
  '6655321',
  'nicole',
  'naruto',
  'master',
  'chocolate',
  'maggie',
  'computer',
  'hannah',
  'jessica',
  '123456789a',
  'password123',
  'hunter',
  '686584',
  'iloveyou1',
  '987654321',
  'justin',
  'cookie',
  'hello',
  'blink182',
  'andrew',
  '25251325',
  'love',
  '987654',
  'bailey',
  'princess1',
  '123456',
  '101010',
  '12341234',
  'a801016',
  '1111',
  '1111111',
  'anthony',
  'yugioh',
  'fuckyou1',
  'amanda',
  'asdf1234',
  'trustno1',
  'butterfly',
  'x4ivygA51F',
  'iloveu',
  'batman',
  'starwars',
  'summer',
  'michael1',
  '00000000',
  'lovely',
  'jakcgt333',
  'buster',
  'jennifer',
  'babygirl1',
  'family',
  '456789',
  'azerty',
  'andrea',
  'q1w2e3r4',
  'qwer1234',
  'hello123',
  '10203',
  'matthew',
  'pepper',
  '12345a',
  'letmein',
  'joshua',
  '131313',
  '123456b',
  'madison',
  'Sample123',
  '777777',
  'football1',
  'jesus1',
  'taylor',
  'b123456',
  'whatever',
  'welcome',
  'ginger',
  'flower',
  '333333',
  '1111111111',
  'robert',
  'samsung',
  'a12345',
  'loveme',
  'gabriel',
  'alexander',
  'cheese',
  'passw0rd',
  '142536',
  'peanut',
  '11223344',
  'thomas',
  'angel1',
];

export const STORAGE = {
  userData: 'user-data',
  jwtToken: 'jwt-token',
  otpTrading: 'trading-otp',
  favSymbols: 'fav-symbols',
};

export const COLOR = {
  myGreen: '#00f4b0',
  myRed: '#ff3747',
  myPurple: '#e683ff',
  myBlue: '#64baff',
  myOrange: '#fbac20',
  myHighlight: '#434343',
  myYellow: '#F0B90B',
};

export const NUMBER = {
  quantityUnit: 100,
  priceUnit: 1000,
};

export const PERCENT = {
  fee: 0.001,
  priceRange: 0.1,
};

export const OPTIONS_USE_FORM: UseFormProps = {
  mode: 'onSubmit',
  reValidateMode: 'onBlur',
  defaultValues: {},
  resolver: undefined,
  context: undefined,
  criteriaMode: 'firstError',
  shouldFocusError: true,
  shouldUnregister: false,
  shouldUseNativeValidation: false,
  delayError: undefined,
};

/* ------- Enum ------- */
export enum MatchedStatus {
  Fulfilled = 'Fulfilled',
  Partial = 'Partial',
}

export enum ModePT {
  default,
  favorite,
}

export enum Gender {
  Female = 0,
  Male = 1,
  Other = 2,
}

export enum DerivativeIndex {
  MYINDEX = -1,

  VNI = 1,
  VN30 = 2,
  HNX = 3,
  HNX30 = 4,
  UPCOM = 5,
  VN100 = 11,

  MIDCAP = 10,
  SMALLCAP = 13,
  ALLSHARE = 12,

  VNX50 = 15,
}

export const INDEX_LIST = [DerivativeIndex.VNI, DerivativeIndex.VN30, DerivativeIndex.HNX, DerivativeIndex.UPCOM];
export const BANKS = ['MBB', 'VCB', 'TCB', 'TPB', 'VPB'];

export enum ActionTypes {
  Initialize = 'Initialize',
  AddStockOrder = 'AddStockOrder',
  EditStockOrder = 'EditStockOrder',
  DeleteStockOrder = 'DeleteStockOrder',
  MatchingStockOrder = 'MatchingStockOrder',
}

/* ------- Special case ------- */
export const TABLE = {
  citizen_identity: 'citizen_identity',
  companies: 'companies',
  industries: 'industries',
  roles: 'roles',
  stock_orders: 'stock_orders',
  stock_order_types: 'stock_order_types',
  users: 'users',
  user_storages: 'user_storages',
  status: 'status',
};

export const USER_STATUS = {
  activated: 'activated',
  deleted: 'deleted',
  banned: 'banned',
  expired_password: 'expired_password',
};

// 2 way enum (special) => use PascalCase + camelCase/UPPERCASE
export enum RoleIdType {
  nothing = 0,
  user = 1,
  company = 2,
  admin = 3,
  moderator = 4,
}

export enum OrderIdType {
  LO = 1,
  MP = 2,
  ATO = 3,
  ATC = 4,
}

export enum StatusIdType {
  activated = 1,
  deleted = 2,
  cancel = 3,
  reject = 4,
  pending = 5,
}

// object like array (use with enum)
export const RoleLabelType: Record<string, string> = {
  '1': 'Người dùng',
  '2': 'Công ty',
  '3': 'Quản trị viên',
  '4': 'Biên tập viên',
};

export const StatusLabelType: Record<string, string> = {
  '1': 'Hoạt động',
  '2': 'Đã xóa',
  '3': 'Đã hủy',
  '4': 'Từ chối',
  '5': 'Chờ duyệt',
};

export const UserStatusLabel: Record<string, string> = {
  [USER_STATUS.activated]: 'Hoạt động',
  [USER_STATUS.banned]: 'Đã khóa',
  [USER_STATUS.expired_password]: 'Hết hạn MK',
};

export const GenderLabel = ['Nữ', 'Nam', 'Khác'];

export const REGEX = {
  username: /^[a-zA-Z_\d]{3,255}$/i,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*+='"<>\]\[\|-]).{8,}$/i,
  email: /^[a-z][a-z0-9_\-.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i,
};

export const OPTIONS_NUMBER = {
  valueAsNumber: true,
  min: { message: `Số nhập vào phải lớn hơn 0`, value: 0 },
  max: { message: `Số nhập vào phải bé hơn 1 tỷ`, value: 1000000000 },
};
