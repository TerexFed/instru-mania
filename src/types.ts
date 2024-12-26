export type Product = {
    productName: string;
    productPrice: string;
    productLink: string;
};

export type Products = Product[]

export type InputProps = {
  type: string;
  isDisabled?: boolean;
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  placeholder: string;
};

export type SearchResultProps = {
  searchInputValue: string;
  results: Products
}