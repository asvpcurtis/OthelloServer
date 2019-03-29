using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.AI
{
    public class AIGameState
    {
        private const ulong R_SHIFT_MASK = 0x7f7f7f7f7f7f7f7f;
        private const ulong L_SHIFT_MASK = 0xfefefefefefefefe;
        private readonly bool BlackTurn;
        private readonly bool GameOver;
        private readonly ulong White;
        private readonly ulong Black;
        public AIGameState(ulong white, ulong black, bool blackTurn, bool gameOver)
        {
            White = white;
            Black = black;
            BlackTurn = blackTurn;
            GameOver = gameOver;
        }
        public AIGameState()
        {
            Black = 0x0000000810000000;
            White = 0x0000001008000000;
            BlackTurn = true;
            GameOver = false;
        }
        private ulong GetLegalMovesMask()
        {
            ulong opponent;
            ulong player;
            if (BlackTurn)
            {
                player = Black;
                opponent = White;
            }
            else
            {
                player = White;
                opponent = Black;
            }
            ulong notOccupied = ~(player | opponent);
            ulong legalMoves = 0x0;
            //slide right
            ulong slider = (player >> 1) & opponent & R_SHIFT_MASK;
            while (slider != 0)
            {
                ulong temp = (slider >> 1) & R_SHIFT_MASK;
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            //slide left
            slider = (player << 1) & opponent & L_SHIFT_MASK;
            while (slider != 0)
            {
                ulong temp = (slider << 1) & L_SHIFT_MASK;
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            //slide up
            slider = (player << 8) & opponent;
            while (slider != 0)
            {
                ulong temp = (slider << 8);
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            //slide down
            slider = (player >> 8) & opponent;
            while (slider != 0)
            {
                ulong temp = (slider >> 8);
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            //slide up-right
            slider = (player << 7) & opponent & R_SHIFT_MASK;
            while (slider != 0)
            {
                ulong temp = (slider << 7) & R_SHIFT_MASK;
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            //slide down-left
            slider = (player >> 7) & opponent & L_SHIFT_MASK;
            while (slider != 0)
            {
                ulong temp = (slider >> 7) & L_SHIFT_MASK;
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            //slide up-left
            slider = (player << 9) & opponent & L_SHIFT_MASK;
            while (slider != 0)
            {
                ulong temp = (slider << 9) & L_SHIFT_MASK;
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            //slide down-right
            slider = (player >> 9) & opponent & R_SHIFT_MASK;
            while (slider != 0)
            {
                ulong temp = (slider >> 9) & R_SHIFT_MASK;
                legalMoves |= temp & notOccupied;
                slider = temp & opponent;
            }

            return legalMoves;
        }

        public IEnumerable<ulong> GetLegalMoves()
        {
            ulong LegalMovesMask = GetLegalMovesMask();
            List<ulong> legalMoves = new List<ulong>();
            while (LegalMovesMask != 0)
            {
                ulong copy = LegalMovesMask;
                LegalMovesMask = LegalMovesMask & (LegalMovesMask - 1); // clears least significant bit
                ulong legalMove = copy ^ LegalMovesMask; // stores least significant bit by itself
                legalMoves.Add(legalMove);
            }
            return legalMoves;
        }

        public AIGameState MakeMove(ulong move)
        {
            ulong slider = move;
            //retrieve information
            ulong opponent;
            ulong player;
            if (BlackTurn)
            {
                player = Black;
                opponent = White;
            }
            else
            {
                player = White;
                opponent = Black;
            }
            ulong notOccupied = ~(player | opponent);
            ulong flippedDisks = 0;
            ulong potential = 0;
            ulong valid = 0; //used to detect if we stopped at player rather than an empty square
            //left
            slider = (move << 1) & opponent & L_SHIFT_MASK;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider << 1) & player & L_SHIFT_MASK;
                slider = (slider << 1) & opponent & L_SHIFT_MASK;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }

            //right
            slider = (move >> 1) & opponent & R_SHIFT_MASK;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider >> 1) & player & R_SHIFT_MASK;
                slider = (slider >> 1) & opponent & R_SHIFT_MASK;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }

            //up
            slider = (move << 8) & opponent;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider << 8) & player;
                slider = (slider << 8) & opponent;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }

            //down
            slider = (move >> 8) & opponent;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider >> 8) & player;
                slider = (slider >> 8) & opponent;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }

            //up-left
            slider = (move << 9) & opponent & L_SHIFT_MASK;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider << 9) & player & L_SHIFT_MASK;
                slider = (slider << 9) & opponent & L_SHIFT_MASK;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }

            //down-right
            slider = (move >> 9) & opponent & R_SHIFT_MASK;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider >> 9) & player & R_SHIFT_MASK;
                slider = (slider >> 9) & opponent & R_SHIFT_MASK;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }

            //up-right
            slider = (move << 7) & opponent & R_SHIFT_MASK;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider << 7) & player & R_SHIFT_MASK;
                slider = (slider << 7) & opponent & R_SHIFT_MASK;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }

            //down-left
            slider = (move >> 7) & opponent & L_SHIFT_MASK;
            while (slider != 0)
            {
                potential |= slider;
                valid = (slider >> 7) & player & L_SHIFT_MASK;
                slider = (slider >> 7) & opponent & L_SHIFT_MASK;
            }
            if (valid != 0) { flippedDisks |= potential; }
            else { potential = 0; }
            //----------------------------------------------
            ulong newBlack;
            ulong newWhite;
            if (BlackTurn)
            {
                newBlack = Black | flippedDisks | move;
                newWhite = White & ~flippedDisks;
            }
            else
            {
                newWhite = White | flippedDisks | move;
                newBlack = Black & ~flippedDisks;
            }

            AIGameState pos = new AIGameState(newWhite, newBlack, !BlackTurn, false);
            if (pos.GetLegalMovesMask() == 0)
            {
                AIGameState swapTurns = new AIGameState(newWhite, newBlack, BlackTurn, false);
                if (swapTurns.GetLegalMovesMask() == 0)
                {
                    return new AIGameState(newWhite, newBlack, !BlackTurn, true);
                }
                else
                {
                    return swapTurns;
                }
            }
            else
            {
                return pos;
            }
        }
        public int TotalWhiteDisks()
        {
            return BitMask.CountSetBits(White);
        }
        public int TotalBlackDisks()
        {
            return BitMask.CountSetBits(Black);
        }
        public ulong GetWhiteBitMask()
        {
            return White;
        }
        public ulong GetBlackBitMask()
        {
            return Black;
        }
        public int LegalMoveCount()
        {
            return BitMask.CountSetBits(GetLegalMovesMask());
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(obj, null) || !(obj is AIGameState))
            {
                return false;
            }

            AIGameState pos = (AIGameState)obj;
            return pos.BlackTurn == BlackTurn && pos.Black == Black && pos.White == White;
        }

        public override int GetHashCode()
        {
            if (BlackTurn)
            {
                return Black.GetHashCode() ^ White.GetHashCode();
            }
            else
            {
                return ~(Black.GetHashCode() ^ White.GetHashCode());
            }
        }
        public static bool operator ==(AIGameState left, AIGameState right)
        {
            if (!ReferenceEquals(left, null) && !ReferenceEquals(right, null))
            {
                return left.Equals(right);
            }
            return ReferenceEquals(left, null) && ReferenceEquals(right, null);
        }
        public static bool operator !=(AIGameState left, AIGameState right)
        {
            return !(left == right);
        }
        public bool IsGameOver()
        {
            return GameOver;
        }
        public bool IsBlackTurn()
        {
            return BlackTurn;
        }
    }
}
