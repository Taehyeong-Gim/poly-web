import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{
  spec: any;
}>(import("swagger-ui-react") as any, { ssr: false });

function ApiDoc({
  spec,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // check user is ADMIN or DEVELOPER
  const session = await getSession(context);
  if (session?.role !== "ADMIN" && session?.role !== "DEVELOPER") {
    return {
      notFound: true,
    };
  }
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Next Swagger API Example",
        version: "1.0.0",
      },
    },
  });
  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
