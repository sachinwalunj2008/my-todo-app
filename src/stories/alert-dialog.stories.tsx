import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
};

export default meta;

export const Base = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline">Open</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const Green = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button className="bg-green-600 hover:bg-green-700 text-white">
        Open Green Dialog
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="border-green-600">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-green-600">
          Success Confirmation
        </AlertDialogTitle>
        <AlertDialogDescription>
          Your changes have been saved successfully. Would you like to proceed
          to the next step?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="border-green-600 text-green-600 hover:bg-green-50">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction className="bg-green-600 hover:bg-green-700">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
