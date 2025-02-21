import { db } from "@/plugins/firebase";
import { collection, addDoc, updateDoc, doc, getDocs, onSnapshot, deleteDoc, arrayUnion, increment, getDoc} from "firebase/firestore";
import { ref } from "vue";

export function usePolls() {
  const polls = ref([]);

  // Fetch polls once (for regular fetch use cases like in stores)
  const getPolls = async () => {
    const snapshot = await getDocs(collection(db, "polls"));
    polls.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return polls.value;
  };

  // Subscribe to polls for real-time updates (onSnapshot)
  const subscribeToPolls = (callback) => {
    const unsubscribe = onSnapshot(collection(db, "polls"), (snapshot) => {
      polls.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(polls.value);
    });

    return unsubscribe;
  };

  // Create a new poll
  const createPoll = async (pollData) => {
    await addDoc(collection(db, "polls"), pollData);
  };

  // Update an existing poll
  const updatePoll = async (pollId, pollData) => {
    const pollRef = doc(db, "polls", pollId);

    // Ensure we are passing valid data
    const updatedData = {
      votes: pollData.votes || {}, // Ensure votes is not undefined
      votedUsers: pollData.votedUsers || [], // Ensure votedUsers is not undefined
    };

    // Perform the update in Firebase
    await updateDoc(pollRef, updatedData);
  };

  const updatePollData = async (pollId, pollData) => {
    const pollRef = doc(db, "polls", pollId);
    try {
      await updateDoc(pollRef, {
        title: pollData.title,
        options: [...pollData.options], 
      });
      
      const updatedSnapshot = await getDoc(pollRef);
      const updatedPoll = { id: updatedSnapshot.id, ...updatedSnapshot.data() };
      polls.value = polls.value.map((p) => p.id = pollId ? updatedPoll : p);

      console.log(polls.value);
      return updatedPoll;
  
    } catch (error) {
      console.error("Error updating poll:", error);
      throw error;
    }
  };
  
  // Delete a poll
  const deletePoll = async (pollId) => {
    await deleteDoc(doc(db, "polls", pollId));
  };

  // Handle voting on a poll
  const voteOnPoll = async (pollId, userId, selectedOption) => {
    if (!selectedOption || !userId) {
      console.error("Invalid data: missing selected option or user ID");
      return;
    }

    // Reference to the poll document
    const pollRef = doc(db, "polls", pollId);

    try {
      // Fetch the poll data first
      const pollSnapshot = await getDoc(pollRef);
      const pollData = pollSnapshot.data();

      // votes and votedUsers are properly set
      if (!pollData.votes) {
        pollData.votes = {}; // set votes if missing
      }
      if (!pollData.votedUsers) {
        pollData.votedUsers = []; // set votedUsers if missing
      }

      // Start a Firestore update
      await updateDoc(pollRef, {
        [`votes.${selectedOption}`]: increment(1),
        votedUsers: arrayUnion(userId), 
      });
      
      console.log("Vote recorded successfully");
    } catch (error) {
      console.error("Error voting: You have voted already!");
    }
  };

  return { polls, getPolls, subscribeToPolls, createPoll, updatePoll, deletePoll, voteOnPoll, updatePollData};
}