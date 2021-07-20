import React from "react";
import Box from "../Box";

function DepositionsInput(props) {
  return (
    <>
      <Box className="menu">
        <h2 className="subTitle">Deixar um depoimento</h2>
        <form
          onSubmit={function handleCreateDepositions(e) {
            const formData = new FormData(e.target);
            //e.preventDefault();

            const deposition = {
              text: formData.get("text"),
              creatorSlug: props.githubUser,
            };
            fetch("/api/depositions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(deposition),
            }).then((response) => e.reload());
            /* For future implamentions
             .then(async (response) => {
              const data = await response.json();
              const deposition = data.record;
              const updateDepositions = [...depositions, deposition];
              setDepositions(updateDepositions);
            }); */
          }}
        >
          <div>
            <textarea name="text" placeholder="digite um texto" rows="4" />
          </div>
          <button>Deixar um depoimento</button>
        </form>
      </Box>
    </>
  );
}

export default DepositionsInput;
