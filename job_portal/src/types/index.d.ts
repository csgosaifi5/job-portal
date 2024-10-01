/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================
interface BlogAttributes {
  blog_id: number;
  title: string;
  description: string;
  image: string;
  banner_title: string;
  banner_image: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  tags: string;
  slug: string;
  createdAt: string;
}
declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};
declare type BannerTitleParams = {
  activeName: string;
  motherName: string;
  imageUrl: string;
};

interface BlogData {
  blog_id: number,
  title: string,
  description: string,
  image: string,
  banner_title: string,
  banner_image: string,
  meta_description: string,
  meta_keywords: string,
  meta_title: string,
  tags: string,
  slug: string,
  createdAt: string,
  updatedAt: string
}

interface ServiceAttributes {
  service_id: number;
  title: string;
  overview: string;
  description: string;
  image: string;
  banner_title: string;
  banner_image: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}


interface ApplicantAttributes {
  applicant_id?: number;
  first_name: string;
  last_name: string;
  phone?: number;
  password?: string;
  reset_password_token?: string;
  account_verified_token?: string;
  is_active?: boolean;
  email_id: string;
  languages?: string;
  country?: string;
  city?: string;
  zip_code?: number;
  full_address?: string;
  designation?: string;
  age?: number;
  current_ctc?: number;
  expected_ctc?: number;
  description?: string;
  image?: string;
  resume_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface blogsProps {
  blogData: BlogData;
}


declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id?: string;
  email?: string;
  userId?: string;
  dwollaCustomerUrl?: string;
  dwollaCustomerId?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  sharableId: string;
};

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  sharableId: string;
};

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};





declare interface PaginationProps {
  page: number;
  totalPages: number;
}



declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}


declare interface Data {
  [key: string]:any;
}
