import { DateSerialisable } from './DateSerialisableExtend';
	export class HelperGeneric
	{

		public static IsDateSerialisable(a: any): a is DateSerialisable
		{
			return (<DateSerialisable>a).MaDateLong !== undefined;
		}

		public static IsDate(a: any): a is Date
		{
			return (<Date>a).addDays !== undefined;
		}

		/// comparaison generic pour trie de tableau par exemple , avec gestion des undefined ou null des parametre
		public static CompareGeneric(a: string | boolean | number | DateSerialisable | Date, b: (string | boolean | number | DateSerialisable | Date)): number 
		{
			//return (<DateSerialisable>a).MaDateLong !== undefined;
			if ( (a == undefined||a==null) && (b == undefined||b==null))
				return 0;
			if (a == undefined || a == null)
				return -1; 
			if (b == undefined || b == null)
				return 1;

			if (typeof (a) != typeof (b)) //des types mélangé inpossible de faire un trie
				return 0;

			if (typeof a === "number" && typeof b === "number")
			{
				if (a > b) return 1;
				if (a < b) return -1;
				return 0;
			}

			if (typeof a === "boolean")
			{
				if (a > b) return 1;
				if (a < b) return -1;
				return 0;
			}

			if (HelperGeneric.IsDate(a) && HelperGeneric.IsDate(b))
			{
				if (a > b) return 1;
				if (a < b) return -1;
				return 0;
			}

			if (typeof a === "string")
				return (a as string).localeCompare(b as string);

			if (HelperGeneric.IsDateSerialisable(a) && HelperGeneric.IsDateSerialisable(b))
			{
				return DateSerialisable.CompareDate(a, b );
			}
			return 0;
		}
	}
