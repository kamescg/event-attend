/**
 * @name FormCreateEvent
 * @version 0.0.1
 */

/* --- Global --- */
import {useState} from 'react';
import useForm from 'react-hook-form';
import {ethers, utils} from 'ethers';

/* --- Local --- */
import Deployer from 'contracts/Deployer';

/* --- Component --- */
const FormCreateEvent = props => {
  /* --- Form Hook State --- */
  const {handleSubmit, register, errors} = useForm();

  /* --- Component State --- */
  const [isComplete, setComplete] = useState();

  /* --- Submit Handler --- */
  const onSubmit = async values => {
    if (values) {
      setComplete(true);

      // The Contract interface
      let abi = Deployer.abi;
      let provider = await ethers.getDefaultProvider('goerli');
      provider = await new ethers.providers.Web3Provider(
        window.web3.currentProvider,
      );
      const wallet = provider.getSigner();
      let contractAddress = '0x3a457f52d1ABa421fE240A0990f68506f29D53Ba';
      let contract = await new ethers.Contract(contractAddress, abi, wallet);

      const amount = utils.hexlify(utils.parseEther(values.deposit));
      const d = utils.hexlify(Number(values.limitOfParticipants));
      const s = utils.hexlify(Number(utils.bigNumberify(values.coolingPeriod)));

      const tx = await contract.deploy(
        values.title,
        amount,
        d,
        s,
        '0x0000000000000000000000000000000000000000',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Atom.Flex column sx={{flex: 1}}>
        <Atom.Heading sx={{mt: 4}}>Event</Atom.Heading>

        <Molecule.Field
          name="title"
          variants={['text']}
          label="Title"
          disabled={isComplete}
          register={register}
          errors={errors}
        />
        <Molecule.Field
          name="deposit"
          variants={['text']}
          type="number"
          label="Deposit"
          disabled={isComplete}
          register={register}
          errors={errors}
        />
        <Molecule.Field
          name="limitOfParticipants"
          variants={['text']}
          type="number"
          label="Limit of Participants"
          disabled={isComplete}
          register={register}
          errors={errors}
        />
        <Molecule.Field
          name="coolingPeriod"
          variants={['text']}
          type="number"
          label="Cooling Period"
          disabled={isComplete}
          register={register}
          errors={errors}
        />

        <Atom.Box sx={{mt: 4}}>
          <Atom.Button bg="blue" color="white" sx={{m: 0}}>
            {isComplete ? (
              <Atom.Span>Creating...</Atom.Span>
            ) : (
              <Atom.Span>Create Event</Atom.Span>
            )}
          </Atom.Button>
        </Atom.Box>
      </Atom.Flex>
    </form>
  );
};

export default FormCreateEvent;
