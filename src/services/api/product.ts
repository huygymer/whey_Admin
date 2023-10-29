import http from ".";
export const getProductsApi = () => {
  return http.get("/products").then((res) => res.data);
};
export const getProductDetailApi = (slug: string) => {
  return http.get("/products/" + slug).then((res) => res.data);
};
export const addNewProductApi = (body: any) => {
  return http.post("/products", body).then((res) => res.data);
};

export const updateProductApi = (id: number, body: any) => {
  return http.put("/products/" + id, body).then((res) => res.data);
};

export const deleteProductApi = (id: number) => {
  return http.delete("/products/" + id).then((res) => res.data);
};
