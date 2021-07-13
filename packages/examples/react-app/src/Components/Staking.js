import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useConnection } from "../Hooks/useConnection";
import { stakingAdapterFactory } from "@unifiprotocol/staking";
import { Blockchains } from "@unifiprotocol/core-sdk";

const Status = {
  Idle: "Idle",
  Staking: "Staking",
  Staked: "Staked",
};

const FormField = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;
const SESAMESEED_VALIDATOR = {
  [Blockchains.Tron]: "TGzz8gjYiYRqpfmDwnLxfgPuLVNmpCswVp",
};
export const Staking = () => {
  const { adapter, blockchain } = useConnection();
  const stakingAdapter = useMemo(
    () => stakingAdapterFactory(adapter),
    [adapter]
  );

  const [state, setState] = useState(Status.Idle);
  const [votes, setVotes] = useState({ available: "0", total: "0" });
  const [amount, setAmount] = useState("0");
  const [validator, setValidator] = useState(SESAMESEED_VALIDATOR[blockchain]);

  useEffect(() => {
    if (stakingAdapter) {
      stakingAdapter.getVotingPower().then(setVotes);
    }
  }, [stakingAdapter]);
  useEffect(() => {
    if (stakingAdapter && validator) {
      stakingAdapter.getVotesGivenTo(validator).then(setAmount);
    }
  }, [stakingAdapter, validator]);

  const action = useCallback(async () => {
    // eslint-disable-next-line default-case
    switch (state) {
      case Status.Idle:
        setState(Status.Staking);
        await stakingAdapter.vote(validator, amount);
        setState(Status.Staked);
        break;
      case Status.Staking:
      case Status.Staked:
        stakingAdapter.getVotingPower().then(setVotes);
        setState(Status.Idle);
        break;
    }
  }, [state, stakingAdapter, validator, amount]);
  return (
    <Card elevation={1}>
      <CardContent>
        <h4>Staking</h4>
        <p>
          You have {votes.available} of {votes.total} votes available.
        </p>
        <FormField>
          <TextField
            onChange={(evt) => setValidator(evt.target.value)}
            label="Validator"
            value={validator}
          />
          <TextField
            onChange={(evt) => setAmount(evt.target.value)}
            label="Amount"
            value={amount}
          />

          <Button
            variant="contained"
            color="primary"
            elevation={1}
            onClick={action}
          >
            {state === Status.Idle && "Vote"}
            {state === Status.Staking && "Voting..."}
            {state === Status.Staked && "Done"}
          </Button>
        </FormField>
      </CardContent>
    </Card>
  );
};
