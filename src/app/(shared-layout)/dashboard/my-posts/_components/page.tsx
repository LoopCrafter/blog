import PrivateComponent from "@/src/components/shared/PrivateComponent";
import CreateBlogPage from "../_components/CreateBlogPage";
import { Suspense } from "react";

const CreatePostPage = () => {
  return (
    <Suspense>
      <PrivateComponent>
        <CreateBlogPage />
      </PrivateComponent>
    </Suspense>
  );
};

export default CreatePostPage;
