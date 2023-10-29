import http from ".";
export const getCategoriesApi = () => {
  return http.get("/categories").then((res) => res.data);
};
export const getCategoryDetailApi = (slug: string) => {
  return http.get("/categories/" + slug).then((res) => res.data);
};
export const addNewCategoryApi = (body: any) => {
  return http.post("/categories", body).then((res) => res.data);
};

export const updateCategoryApi = (id: any, body: any) => {
  return http.put("/categories/" + id, body).then((res) => res.data);
};

export const deleteCategoryApi = (id: number) => {
  return http.delete("/categories/" + id).then((res) => res.data);
};
