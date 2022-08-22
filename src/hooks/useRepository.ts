import { useSelector } from "react-redux"
import { RootState } from "../redux/reducers"


export const useRepository = () => {
    const {repository: {nameRepo, branches}} = useSelector(({repository}: RootState) => repository);


    return {nameRepo: nameRepo, branches: branches}
}